using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Threading;
using System.Globalization;
using System.Collections.Specialized;
using System.Collections;
//using Generic.Util;
using System.IO;

/// <summary>
/// BasePage for the common funtionality in all 
/// the web pages of the site.
/// </summary>
public class BasePageLanguage : Page
{
    /// <summary>
    /// Default constructor
    /// </summary>
    public void BasePage()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    /// <summary>
    /// The name of the PostBack event target field in a posted form.  You can use this to see which
    /// control triggered a PostBack:  Request.Form[PostBackEventTarget] .
    /// </summary>
    public const string PostBackEventTarget = "__EVENTTARGET";

    /// <SUMMARY>
    /// Overriding the InitializeCulture method to set the user selected
    /// option in the current thread. Note that this method is called much
    /// earlier in the Page lifecycle and we don't have access to any controls
    /// in this stage, so have to use Form collection.
    /// </SUMMARY>
    protected override void InitializeCulture()
    {
        ///<remarks><REMARKS>
        ///Check if PostBack occured. Cannot use IsPostBack in this method
        ///as this property is not set yet.
        ///</remarks>
        if (Request[PostBackEventTarget] != null)
        {
            //string controlID = GetPostbackControlId();
            //if (controlID != null)
            //{
            //    SetCulture(controlID.Replace('_', '-'), controlID.Replace('_', '-'));

            //}
            //else
            //{
            //    SetCulture("de-DE", "de-DE");
            //}
            if (Session["MyUICulture"] != null && Session["MyCulture"] != null)
            {
                SetCulture(Session["MyUICulture"].ToString(), Session["MyUICulture"].ToString());
            }
            else
            {
                SetCulture("en-US", "en-US");
            }
        }

        ///<remarks>
        ///Get the culture from the session if the control is tranferred to a
        ///new page in the same application.
        ///</remarks>
        if (Session["MyUICulture"] != null && Session["MyCulture"] != null)
        {
            Thread.CurrentThread.CurrentUICulture = (CultureInfo)Session["MyUICulture"];
            Thread.CurrentThread.CurrentCulture = (CultureInfo)Session["MyCulture"];

        }
        base.InitializeCulture();

    }

    private string GetPostbackControlId()
    {
        if (ConfigurationSettings.AppSettings["AllLanguages"] == null)
            throw new Exception("The key 'AllLanguages' was not set on web.config. Please set it with as many languagues as the resource files (.resx) have. The first one has to be the default desired language. Ex: <add key=\"AllLanguages\" value=\"sv-se;en-us\" />");

        string defaultLanguage = ConfigurationSettings.AppSettings["AllLanguages"].Split(';')[0];

        string[] allKeys = Request.Form.AllKeys;

        foreach (string key in allKeys)
        {
            if (!string.IsNullOrEmpty(key))
            {
                string shortName = key.Replace("_ctl0:", "").Replace(".x", "").Replace(".y", "");

                if (ConfigurationSettings.AppSettings["AllLanguages"].Contains(shortName.Replace("_", "-")))
                {
                    return shortName;
                }
            }
        }
        return null; //RETURNS THE DEFAULT
    }

    /// <Summary>
    /// Sets the current UICulture and CurrentCulture based on
    /// the arguments
    /// </Summary>
    /// <PARAM name="name"></PARAM>
    /// <PARAM name="locale"></PARAM>
    protected void SetCulture(string name, string locale)
    {
        Thread.CurrentThread.CurrentUICulture = new CultureInfo(name);
        Thread.CurrentThread.CurrentCulture = new CultureInfo(locale);
        ///<remarks>
        ///Saving the current thread's culture set by the User in the Session
        ///so that it can be used across the pages in the current application.
        ///</remarks>
        Session["MyUICulture"] = Thread.CurrentThread.CurrentUICulture;
        Session["MyCulture"] = Thread.CurrentThread.CurrentCulture;
    }

  
}
