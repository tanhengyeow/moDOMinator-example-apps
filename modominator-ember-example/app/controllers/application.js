import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    update() {
      this.get('model').pushObject({
        name: 'Harry the Hacker',
        text: this.get('text'),
        photo: 'https://static.pexels.com/photos/37533/studio-portrait-woman-face-37533.jpeg'
      });
    }
  }
});
