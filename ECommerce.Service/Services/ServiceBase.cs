using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace ECommerce.Service.Services
{
    public abstract class ServiceBase
    {
        // ---------------------------------------------------------------------------------------------
        // Variables
        // ---------------------------------------------------------------------------------------------

        private readonly log4net.ILog logger;
        protected abstract Type ConcreteType { get; }

        // ---------------------------------------------------------------------------------------------
        // Public Methods
        // ---------------------------------------------------------------------------------------------

        #region ServiceBase
        public ServiceBase()
        {
            logger = log4net.LogManager.GetLogger(this.ConcreteType);
        }
        #endregion

        #region LogInfo
        public void LogInfo(string message)
        {
            if (!string.IsNullOrWhiteSpace(message))
                logger.Info(message);
        }
        #endregion

        #region LogError
        public string LogError(Exception ex)
        {
            string errorCode = Math.Abs(Guid.NewGuid().GetHashCode()).ToString();

            logger.Error($"CODE: {errorCode} => {ex.Message}", ex);

            return errorCode;
        }
        #endregion

        #region LogError
        public string LogError(Exception ex, MethodBase methodBase)
        {
            string msgError = "";
            try
            {
                // Generate error code
                string errorCode = Math.Abs(Guid.NewGuid().GetHashCode()).ToString();

                // Try get method name
                string errorMethod = string.Empty;
                try
                {
                    errorMethod = (methodBase == null ? "" : " - Method: " + methodBase.Name);
                }
                catch { }

                // Log error
                logger.Error($"CODE: {errorCode} => {ex.Message}", ex);

                // Return error message
                string innerException = string.Empty;
                if (ex.InnerException != null)
                    innerException = ex.InnerException.Message;

                string stackTrace = string.Empty;
                if (ex.StackTrace != null)
                    stackTrace = ex.StackTrace;

                msgError = $"{ex.Message} - InnerException: { innerException } - StackTrace: { stackTrace } - Error Code: {errorCode} {errorMethod}";
            }
            catch
            {
                msgError = ex.Message;
            }

            return msgError;
        }
        #endregion

        #region LogError
        public string LogError(string message, MethodBase methodBase)
        {
            // Generate error code
            string errorCode = Math.Abs(Guid.NewGuid().GetHashCode()).ToString();

            // Try get method name
            string errorMethod = string.Empty;
            try
            {
                errorMethod = (methodBase == null ? "" : " - Method: " + methodBase.Name);
            }
            catch { }

            // Log error
            logger.Error($"CODE: {errorCode} => {message}");

            // Return error message
            return $"{message} - Error Code: {errorCode} {errorMethod}";
        }
        #endregion


        #region FormatHtmlMessage
        public string FormatHtmlMessage(Exception ex)
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendLine(ex.Message);

            if (ex.InnerException != null)
            {
                builder.AppendLine("<br/><br/>");
                builder.AppendLine(ex.InnerException.Message);
            }

            return builder.ToString();
        }
        #endregion
    }
}
