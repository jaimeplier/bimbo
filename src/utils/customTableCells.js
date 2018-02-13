// eslint-disable-next-line
import React from 'react';

export function timeCell(row) {
  return (
    <div className="score-td">{ (formatDate(row.value)).time }<br />{ (formatDate(row.value)).date }</div>
  );
}

export function lotCell(row) {
  return (
    <div className="lot-number score-td">{ row.value }</div>
  );
}

// Helper functions

export function formatDate(date) {
  const newDate = new Date(date);
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  const strDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
  return { time: strTime, date: strDate };
}
