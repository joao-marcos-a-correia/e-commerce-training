using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Service.DTOs
{
    public class ResponseBase
    {
        public ResponseBase()
        {
            Success = true;
        }

        public bool Success { get; set; }
        public string Message { get; set; }
        public Exception Exception { get; set; }
        public short ResponseCode { get; set; }
    }

    public class ResponseBase<T> : ResponseBase
    {
        public T Data { get; set; }

        public ResponseBase()
        {
            Success = true;
        }

        public void CopyErrorState(ResponseBase responseTo)
        {
            responseTo.Success = this.Success;
            responseTo.Message = this.Message;
        }
    }
}
