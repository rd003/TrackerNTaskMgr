using TrackerNTaskMgr.Api.DTOs;
using TrackerNTaskMgr.Api.Entities;

namespace TrackerNTaskMgr.Api.Mappers;

public static class SubTaskMapper
{
    public static SubTask ToSubTask(this SubTaskDto st)
    {
        return new SubTask
        {
            SubTaskTitle = st.SubTaskTitle!,
            SubTaskUri = st.SubTaskUri
        };
    }

    public static SubTask ToSubTask(this SubTaskUpdateDto st)
    {
        return new SubTask
        {
            Id = st.SubTaskId!,
            SubTaskTitle = st.SubTaskTitle,
            SubTaskUri = st.SubTaskUri
        };
    }
}
