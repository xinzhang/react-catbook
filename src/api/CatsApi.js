class CatsApi {
  static getAllCats() {
    return fetch('http://localhost:5000/api/cats').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

    static updateCat(cat) {
      const request = new Request(`http://localhost:5000/api/cats/${cat.id}`, {
          method: 'PUT',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({cat: cat})
      })

      return fetch(request).then(response => {
            return response.json();
          }).catch(error => {
            return error;
          });
                
    }
}
export default CatsApi;
