using System;
using System.Collections.Generic;

namespace HoozOn.Extensions {
    public class DateFormat {
        public static string RelativeDate (DateTime theDate) {
            Dictionary<long, string> thresholds = new Dictionary<long, string> ();
            int minute = 60;
            int hour = 60 * minute;
            int day = 24 * hour;
            thresholds.Add (60, "{0} s ago");
            thresholds.Add (minute * 2, "a m ago");
            thresholds.Add (45 * minute, "{0} m ago");
            thresholds.Add (120 * minute, "an h ago");
            thresholds.Add (day, "{0} h ago");
            thresholds.Add (day * 2, "yesterday");
            thresholds.Add (day * 30, "{0} d ago");
            thresholds.Add (day * 365, "{0} mo ago");
            thresholds.Add (long.MaxValue, "{0} y ago");
            long since = (DateTime.Now.Ticks - theDate.Ticks) / 10000000;
            foreach (long threshold in thresholds.Keys) {
                if (since < threshold) {
                    TimeSpan t = new TimeSpan ((DateTime.Now.Ticks - theDate.Ticks));
                    return string.Format (thresholds[threshold], (t.Days > 365 ? t.Days / 365 : (t.Days > 0 ? t.Days : (t.Hours > 0 ? t.Hours : (t.Minutes > 0 ? t.Minutes : (t.Seconds > 0 ? t.Seconds : 0))))).ToString ());
                }
            }
            return "";
        }

        public static string MeridianTime (DateTime date) {
            return date.ToString("h:mm tt");
        }
    }

}