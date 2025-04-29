import { HttpErrorResponse } from "@angular/common/http";
import { TrackEntryReadModel } from "../data/track-entry-read.model";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { TrackEntryCreateModel, TrackEntryUpdateModel } from "../data/track-entry-create.model";
import { inject } from "@angular/core";
import { TrackEntryService } from "../data/track-entry.service";

export interface TrackEntryState {
   trackEntries: readonly TrackEntryReadModel[],
   loading: boolean,
   error: HttpErrorResponse | null
}

export class TrackEntryStore {
   private readonly _initialState: TrackEntryState = {
      trackEntries: [],
      loading: false,
      error: null
   }

   private readonly _state$ = new BehaviorSubject<TrackEntryState>(this._initialState);
   private readonly _trackEntryService = inject(TrackEntryService);

   entries$ = this._state$.pipe(map(a => a.trackEntries));
   loading$ = this._state$.pipe(map(a => a.loading));
   error$ = this._state$.pipe(map(a => a.error));

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

   private loadTrackEntries() {
      this.setLoading();

      this._trackEntryService.getEntries()
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
      this.loadTrackEntries();
   }
}