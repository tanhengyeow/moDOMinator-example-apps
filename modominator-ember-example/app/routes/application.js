import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {name: 'Hugh Handerson',
        text: 'One of the most important things about frontend security is',
        photo: 'https://static.pexels.com/photos/413444/pexels-photo-413444.jpeg'
      },
      {name: 'Hugh Handerson',
        text: 'to prevent XSS attack',
        photo: 'https://static.pexels.com/photos/413444/pexels-photo-413444.jpeg'
      }
    ]
  }
});

