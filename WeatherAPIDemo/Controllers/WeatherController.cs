using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WeatherAPIDemo.Controllers
{
    public class WeatherController : ApiController
    {
		protected string APIKey = "0a5a212e313c45b9769d2317c48572c7";
		protected string CityID = "5786882"; //Bellevue CityID extracted from OpenWeatherApp
		protected string BaseAPIUrl = "http://api.openweathermap.org/data/2.5/weather?";
		protected string ForeacastAPIUrl = "http://api.openweathermap.org/data/2.5/forecast/";


		// GET: api/Weather
		// gets current weather data
		public string Get()
        {
			string RequestBase = "{0}id={1}&APPID={2}&mode=html";
			string ApiRequestUrl = String.Format(RequestBase, BaseAPIUrl, CityID, APIKey);
			using (var wb = new WebClient())
			{
				var response = wb.DownloadString(ApiRequestUrl);
				return response;
			}

			return "Error Occured";
		}

		// GET: api/Weather/[daily, hourly]
		// WeatherType [daily, hourly]
		public string Get(string WeatherType)
		{
			string RequestBase = "{0}/{1}?id={2}&APPID={3}&mode=html";
			string ApiRequestUrl = String.Format(RequestBase, BaseAPIUrl, WeatherType, CityID, APIKey);

			using (var wb = new WebClient())
			{
				var response = wb.DownloadString(ApiRequestUrl);
				return response;
			}

			return "Error Occured";
        }
    }
}
