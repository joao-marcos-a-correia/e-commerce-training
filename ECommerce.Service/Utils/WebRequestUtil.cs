using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;

namespace ECommerce.Service.Utils
{
    public class WebRequestUtil
    {
        public static string Request(string url, string method, string contentType, int timeout = 60000)
        {
            try
            {
                HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
                webRequest.Method = method;
                webRequest.ContentType = contentType;
                webRequest.Timeout = timeout;

                var response = webRequest.GetResponse();
                var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();

                return responseString;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public static string RequestPost(string url, string method, string contentType, string bodyContent, int timeout = 600000)
        {
            string responseRequest = null;
            try
            {
                HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
                webRequest.Method = method;
                webRequest.Timeout = timeout;

                if (!string.IsNullOrEmpty(bodyContent))
                {
                    webRequest.ContentType = contentType;

                    using (StreamWriter sw = new StreamWriter(webRequest.GetRequestStream()))
                        sw.Write(bodyContent);
                }

                WebResponse webResponse = webRequest.GetResponse();
                if (webResponse != null)
                {
                    using (StreamReader sr = new StreamReader(webResponse.GetResponseStream()))
                        responseRequest = sr.ReadToEnd();
                }
            }
            catch (WebException we)
            {
                throw new WebException("Erro ao realizar requisição: ", we);
            }

            return responseRequest;
        }
    }
}
