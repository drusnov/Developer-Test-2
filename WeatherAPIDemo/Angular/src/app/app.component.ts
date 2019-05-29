import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather Api Demo';
  private baseAPIUrl = "http://localhost:8080/api/";
  currentWeatherData = null;
  dailyWeatherData = null;
  hourlyWeatherData = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  private cleanOutResponse(response) {
    var body = response.toString().split('body');
    var script = body[1].split('script')[0].substr(4);
    var content = script.substr(0, script.length - 1);
    return content;
  }

  getCurrentWeatherData() {
    this.http.get(this.baseAPIUrl + '/weather').subscribe((res) => {
      var content = this.cleanOutResponse(res);
      this.currentWeatherData = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }

  getDailyWeatherData() {
    this.http.get(this.baseAPIUrl + '/weather/daily').subscribe((res) => {
      var content = this.cleanOutResponse(res);
      this.dailyWeatherData = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }

  getHourlyWeatherData() {
    this.http.get(this.baseAPIUrl + '/weather/hourly').subscribe((res) => {
      var content = this.cleanOutResponse(res);
      this.hourlyWeatherData = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }
}
