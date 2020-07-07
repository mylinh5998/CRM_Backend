import moment from 'moment';
export var getDaysArray = function(start, end) {
   
    // console.log(start)
    // console.log(end)
    var endate = new Date(end).addDays(1)
    
    for(var arr=[],dt=new Date(start).addDays(1); dt<=endate; dt.setDate(dt.getDate()+1)){
        // console.log('start',dt)
        // console.log('end',endate)
        arr.push(new Date(dt));
    }
    return arr;
};
 Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
export function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }