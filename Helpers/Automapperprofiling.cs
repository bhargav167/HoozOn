using System.Linq;
using AutoMapper;
using HoozOn.DTOs;
using HoozOn.DTOs.Message;
using HoozOn.Entities.Authentication;
using HoozOn.Entities.Message;
using HoozOn.Entities.Message.JobMessage;
using HoozOn.Entities.Users;

namespace HoozOn.Helpers {
    public class Automapperprofiling : Profile {
        public Automapperprofiling () {
            CreateMap<SocialAuthentication, UserUpdateDtos> ();
             CreateMap<MessageDto, MessageModal> ();
              CreateMap<MessageModal,MessageDto> ();

               CreateMap<MessageDto, JobMessages> ();
              CreateMap<JobMessages,MessageDto> ();

            CreateMap<UserUpdateDtos, SocialAuthentication> ();
            CreateMap<UserUpdateDtos, SocialAuthentication> ();
            CreateMap<MessageForCreationDto, MessageModal> ().ReverseMap ();
            CreateMap<MessageModal, MessageToReturnDto> ()
                .ForMember (m => m.SenderPhotoUrl, opt => opt
                    .MapFrom (u => u.Sender.ImageUrl))
                .ForMember (m => m.RecipientPhotoUrl, opt => opt
                    .MapFrom (u => u.Recipient.ImageUrl));
        }
    }
}