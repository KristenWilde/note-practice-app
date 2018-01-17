var noteData = [{
  note: 'Treble G5',
  thumbnail: 'thumbnails/tg5',
  practices: [{
    date: '01-16-2018',
    speed: '3.2',
    accuracy: '96',
  }, {
    date: '01-03-2018',
    speed: '3.8',
    accuracy: '90',
  }, {
    date: '12-14-2017',
    speed: '4.9',
    accuracy: '90',
  }],
  mastered: '',
}, {
  note: 'Treble F5',
  thumbnail: 'thumbnails/tf5',
  practices: [{
    date: '01-16-2018',
    speed: '3.2',
    accuracy: '96',
  }, {
    date: '01-03-2018',
    speed: '3.8',
    accuracy: '90',
  }, {
    date: '12-14-2017',
    speed: '4.9',
    accuracy: '90',
  }, {
    date: '12-12-2017',
    speed: '4.8',
    accuracy: '88',
  }, {
    date: '12-11-2017',
    speed: '4.8',
    accuracy: '88',
  }],
  mastered: '',
},{
  note: 'Bass C3',
  thumbnail: 'thumbnails/tf5',
  practices: [{
    date: '01-16-2018',
    speed: '3.2',
    accuracy: '96',
  }, {
    date: '01-03-2018',
    speed: '3.8',
    accuracy: '90',
  }, {
    date: '12-14-2017',
    speed: '4.9',
    accuracy: '90',
  }, {
    date: '12-12-2017',
    speed: '4.8',
    accuracy: '88',
  }, {
    date: '12-11-2017',
    speed: '4.8',
    accuracy: '88',
  }],
  mastered: '',
}];

var tablesTemplate = Handlebars.compile($('#template').html());

$('#tables').append(tablesTemplate(noteData));