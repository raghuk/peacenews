import Moment from 'moment-timezone';

export default class getAge {

    static local(date) {

        Moment.updateLocale('en', {
            relativeTime: {
                future: "in %s",
                past:   "%s ago",
                s:  "Now",
                m:  "1m ago",
                mm: "%dm ago",
                h:  "1h ago",
                hh: "%dh ago",
                d:  "1d ago",
                dd: "%dd ago",
                M:  "1M ago",
                MM: "%dM ago",
                y:  "1y ago",
                yy: "%dy ago"
            }
        });

        return Moment.tz(date, 'Asia/Kolkata').fromNow(true);
    }
}
