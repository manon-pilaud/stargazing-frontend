var now = new Date();
var month_array = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var moocal='<style>.mctd {border:1px solid white;text-align:left;vertical-align:top;}</style>';
moocal+="<table cellspacing=0 cellpadding=0 border=5 bgcolor=black style='background: #000000;'><tr><td><table border=0 cellpadding=2 align=center bgcolor=black style='background: #000000;color:white;border-collapse:collapse;font-family:arial'><tr><td class=mctd style='border-right:0px;vertical-align:middle;' colspan=3> <b><font size=+2>Moon Calendar</font></b>";
moocal+="</td><td class=mctd colspan=4 align=right style='text-align:right;vertical-align:middle;border-left:0px'>";
moocal += "<form style='margin-bottom:0' name=date_list><select style='color:black;width:125px' name=month onchange=change_month(this.options.selectedIndex)>";

for(i=0;i<month_array.length;i++){
 if (now.getMonth() != i){
     moocal += "<option style='color:black' value=" + i + ">" + month_array[i] + "</option>";
 }else{
     moocal += "<option style='color:black' value=" + i + " selected>" + month_array[i] + "</option>";
 }
}

moocal+="</select> ";
moocal += "<select style='color:black;width:75px' name=year onchange=change_year(this.options[this.options.selectedIndex])>";

for(i=1900;i<3000;i++){
 if (now.getFullYear() != i){
     moocal += "<option style='color:black' value=" + i + ">" + i + "</option>";
 }else{
     moocal += "<option style='color:black' value=" + i + " selected>" + i + "</option>";
 }
}

moocal+="</select></form></td></tr>";
moocal+="<tr bgcolor=gray align=center>";
moocal+="<td class=mctd>Sun</td><td class=mctd>Mon</td><td class=mctd>Tue</td><td class=mctd>Wed</td><td class=mctd>Thu</td><td class=mctd>Fri</td><td class=mctd>Sat</td>";
moocal+="</tr><tr>";

for(j=0;j<6;j++){
 for(i=0;i<7;i++){
   moocal+="<td class=mctd width=70 height=60 align=left valign=top id=d"+i+"r"+j+"></td>";
 }
 moocal+="</tr>";
}

moocal+="</table></tr></td></table>";
//moocal+="</form>";
//document.getElementById('mooncal').innerHTML=moocal;

document.write(moocal);

var show_date = new Date();

function set_cal(show_date){
 begin_day = new Date (show_date.getFullYear(),show_date.getMonth(),1);
 begin_day_date = begin_day.getDay();
 end_day = new Date (show_date.getFullYear(),show_date.getMonth()+1,1);
 count_day = Math.floor(1/24 + (end_day - begin_day)/1000/60/60/24);
 input_table(begin_day_date,count_day);
}

set_cal(show_date);

function input_table(begin,count){
 var blueMoonDate = new Date(2003, 11, 23, 3, 44, 0);
 init();
 j=0;
 i=begin;
 for (c=1;c<count+1;c++){
  //colum_name = eval("d"+i+"r"+j);
  colum_name = document.getElementById("d"+i+"r"+j);
  if ((now.getDate() == c)&&(show_date.getMonth() == now.getMonth())&&(show_date.getFullYear() == now.getFullYear())) {colum_name.style.color = "red";};
  colum_name.innerText =  c;
  colum_name.verticalAlign = "top";
  //Moon Phase Calculation
  var currentDate = new Date(show_date.getFullYear(), show_date.getMonth(), c, 0, 0, 0);
  var lunarPeriod  = 29*(24*3600*1000) + 12*(3600*1000) + 44.05*(60*1000);
  var moonPhaseTime = (currentDate.getTime() - blueMoonDate.getTime()) % lunarPeriod;
  var percentRaw = (moonPhaseTime / lunarPeriod);
  var lunarday = Math.round(29*percentRaw);
  if (lunarday<0) lunarday = Math.round(29+12/24+44.05/(24*60) + 29*percentRaw);
  colum_name.innerHTML= c + "<img align=right src=http://www.physics.sfasu.edu/observatory/SFAMoonPhases/moon" + lunarday + ".gif>";
  i++;
  if (i==7){i=0;j++;}
 }
}

function init(){
 for(j=0;j<6;j++){
  for(i=0;i<7;i++){
   //colum_name = eval("d"+i+"r"+j);
   colum_name = document.getElementById("d"+i+"r"+j);
   colum_name.innerText =  " ";
   colum_name.innerHTML =  " ";
   colum_name.style.backgroundColor ="";
   colum_name.style.color ="";
  }
 }
}

function change_month(sel_month){
  show_date = new Date(show_date.getFullYear(),sel_month,1);
  set_cal(show_date);
}

function change_year(sel_year){
  sel_year = sel_year.value;
  show_date = new Date(sel_year,show_date.getMonth(),1);
  set_cal(show_date);
}
