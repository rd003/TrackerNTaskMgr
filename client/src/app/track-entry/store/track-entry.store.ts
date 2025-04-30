import { HttpErrorResponse } from "@angular/common/http";
import { TrackEntryReadModel } from "../data/track-entry-read.model";
import { BehaviorSubject, catchError, combineLatest, distinctUntilChanged, map, Observable, of, tap } from "rxjs";
import { TrackEntryCreateModel, TrackEntryUpdateModel } from "../data/track-entry-create.model";
import { inject } from "@angular/core";
import { TrackEntryService } from "../data/track-entry.service";
import { SortDirection } from "@angular/material/sort";

export interface TrackEntryState {
   trackEntries: readonly TrackEntryReadModel[],
   sortDirection: SortDirection,
   lastEntryDate: string | null,
   loading: boolean,
   error: HttpErrorResponse | null
}

export class TrackEntryStore {
   private readonly _initialState: TrackEntryState = {
      trackEntries: [],
      sortDirection: "desc",
      lastEntryDate: null,
      loading: false,
      error: null
   }

   private readonly _state$ = new BehaviorSubject<TrackEntryState>(this._initialState);
   private readonly _trackEntryService = inject(TrackEntryService);

   entries$ = this._state$.pipe(map(a => a.trackEntries));
   loading$ = this._state$.pipe(map(a => a.loading));
   error$ = this._state$.pipe(map(a => a.error));

   setSortDirection(sortDir: SortDirection) {
      this._state$.next({ ...this._state$.value, sortDirection: sortDir })
   }

   addEntry(entry: TrackEntryCreateModel) {
      this.setLoading();
      this._trackEntryService.createEntry(entry)
         .pipe(
            tap((createdEntry) => {
               this._state$.next({
                  ...this._state$.value,
                  trackEntries: [...this._state$.value.trackEntries, createdEntry],
                  loading: false
               })
            }),
            catchError(error => this.handleFailure(error))
         )
         .subscribe();
   }

   updateEntry(entry: TrackEntryUpdateModel) {
      this.setLoading();
      this._trackEntryService.updateEntry(entry)
         .pipe(
            tap((updatedEntry) => {
               console.log(updatedEntry)
               this._state$.next({
                  ...this._state$.value,
                  loading: false,

                  trackEntries: this._state$.value.trackEntries.map(en => en.trackEntryId == entry.trackEntryId ? updatedEntry : en)
               })
            }),
            catchError(this.handleFailure)
         )
         .subscribe();
   }

   deleteTrackEntry(id: number) {
      this._trackEntryService.deleteEntry(id)
         .pipe(
            tap((_) => {
               this._state$.next({
                  ...this._state$.value,
                  trackEntries: this._state$.value.trackEntries.filter(v => v.trackEntryId != id)
               })
            }),
            catchError(this.handleFailure)
         )
         .subscribe()
   }

   private loadTrackEntries(startDate: string | null = null, endDate: string | null = null, lastEntryDate: string | null = null, limit: number, sortDirection: string) {
      this._trackEntryService.getEntries(startDate, endDate, lastEntryDate, limit, sortDirection)
         .pipe(
            tap(trackEntries => {
               this._state$.next({
                  ...this._state$.value,
                  trackEntries,
                  loading: false,
               })
            }),
            catchError((error) => {
               return this.handleFailure(error);
            })
         )
         .subscribe();
   }

   private handleFailure(error: HttpErrorResponse): Observable<HttpErrorResponse> {
      this._state$.next({
         ...this._state$.value,
         loading: false,
         error
      });
      return of(error);
   }

   private setLoading() {
      this._state$.next({
         ...this._state$.value,
         loading: true
      });
   }

   constructor() {
      combineLatest([
         this._state$.pipe(map(s => s.sortDirection), distinctUntilChanged()),
         this._state$.pipe(map(s => s.lastEntryDate), distinctUntilChanged())
      ]).pipe(
         tap(([sortDirection, lastEntryDate]) => {
            this.loadTrackEntries(null, null, lastEntryDate, 10, sortDirection);
         })
      ).subscribe();
   }
}