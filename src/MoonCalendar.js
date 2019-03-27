import React, { PureComponent } from 'react';

export default class MoonCalendar extends React.PureComponent {
  componentDidMount() {
     const s = document.createElement('script');
     s.type = 'text/javascript';
     s.async = true;
     s.innerHTML = `document.write('<scr'+'ipt type="text/javascript" src="http://www.midnightkite.com/mooncalendar.js"></sc'+'ript>')`
     this.instance.appendChild(s);
   }
   render() {
     return <div ref={el => (this.instance = el)} />;
   }
}
