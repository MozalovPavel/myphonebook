app.service('phonebookFactory', function () {
      this.getPhonebook = function () {
        //   localStorage.clear();
          var stringPhonebook = localStorage.getItem('phonebook') || '[]';

          console.log(JSON.parse(stringPhonebook));
          return JSON.parse(stringPhonebook);
      };
      this.setPhonebook = function (phonebook) {
          localStorage.setItem('phonebook', JSON.stringify(phonebook));
      };
  });
