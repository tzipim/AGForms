using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Xml;

namespace AGforms.Handler
{
    /// <summary>
    /// Summary description for OfflineHandle
    /// </summary>
    public class OfflineHandle : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string ComboFor = GetParamFromClient(context, "combofor");
            if (!string.IsNullOrEmpty(ComboFor))
            {
                var resp1 = context.Response;
                resp1.ContentType = "text/xml";
                resp1.ContentEncoding = System.Text.Encoding.UTF8;
                context.Response.Write(RetriveXML(context, ComboFor));
            }
        }

        public string RetriveXML(HttpContext context, string combofor)
        {
            XmlDocument xmlDoc = new XmlDocument();

            XmlNode docNode = xmlDoc.CreateXmlDeclaration("1.0", "UTF-8", null);
            xmlDoc.AppendChild(docNode);
            XmlNode root = xmlDoc.CreateElement("root");


            XmlNode bank1 = xmlDoc.CreateElement("ComboOptions");

            XmlNode append11 = xmlDoc.CreateElement("dataText");
            append11.InnerText = "";

            XmlNode append111 = xmlDoc.CreateElement("dataTextAll");
            append111.InnerText = "בחר";

            XmlNode append211 = xmlDoc.CreateElement("dataCode");
            append211.InnerText = "";

            bank1.AppendChild(append11);
            bank1.AppendChild(append111);
            bank1.AppendChild(append211);
            root.AppendChild(bank1);

            xmlDoc.AppendChild(root);
            StringBuilder sb = new StringBuilder();


            for (int count = 1; count < 5; count++)
            {

                XmlNode bank = xmlDoc.CreateElement("ComboOptions");

                XmlNode append = xmlDoc.CreateElement("dataText");
                append.InnerText = combofor + count.ToString();

                XmlNode append1 = xmlDoc.CreateElement("dataTextAll");
                append1.InnerText = combofor + count.ToString(); ;

                XmlNode append2 = xmlDoc.CreateElement("dataCode");
                append2.InnerText = count.ToString();
                bank.AppendChild(append);
                bank.AppendChild(append1);
                bank.AppendChild(append2);
                root.AppendChild(bank);
            }


            return xmlDoc.InnerXml;
        }


        private string GetParamFromClient(HttpContext context, string paramName)
        {
            return context.Request[paramName];
        }

        private string SerilizeObject<T>(T obj)
        {
            string res = string.Empty;
            try
            {
                MemoryStream ms = new MemoryStream();

                // Serializer the User object to the stream.
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
                ser.WriteObject(ms, obj);
                byte[] json = ms.ToArray();
                ms.Close();
                res = Encoding.UTF8.GetString(json, 0, json.Length);
            }
            catch (Exception ex)
            {

            }
            return res;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}