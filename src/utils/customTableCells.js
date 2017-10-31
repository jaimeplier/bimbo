import React from 'react';

export function timeCell(row) {
  return (
    <div className='score-td'>{ formatDate(row.value) }</div>
  )
}

export function lotCell(row) {
  return (
    <div className={'lot-number score-td'}>{ row.value }</div>
  )
}

// Helper functions

export function formatDate(date) {
  date = new Date(date);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}
