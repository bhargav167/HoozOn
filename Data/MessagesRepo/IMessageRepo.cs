using System.Collections.Generic;
using System.Threading.Tasks;
using HoozOn.DTOs.Message;
using HoozOn.Entities.Message;
using HoozOn.Entities.Message.JobMessage;

namespace HoozOn.Data.MessagesRepo {
    public interface IMessageRepo {
        Task<MessageModal> GetMessage (int id);
        Task<IEnumerable<MessageDto>> GetMessagesForUser(int userId);
        Task<IEnumerable<MessagedUsers>> GetMessagedUser(int userId);
        Task<IEnumerable<MessageDto>> GetSingleUserChat(int senderId,int RecipientId);

        Task<MessagedUsers> AddChatUser (MessagedUsers messagedUser);

        //Message Against Jobs
        Task<JobMessages> AddJobChat (JobMessages messagedUser);
        Task<JobUserChat> AddJobUserChat (JobUserChat jobUserChat);
        Task<IEnumerable<JobUserChat>> JobUserResponcesDetails (int jobId,int userId);
        Task<JobUserChat> JobUserChartByJob (int jobId,int userId);
         Task<IEnumerable<MessageDto>> GetSingleUserChatByJob(int jobId,int senderId,int RecipientId);

    }
}