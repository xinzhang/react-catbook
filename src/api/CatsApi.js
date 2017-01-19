class CatsApi {
  static getAllCats() {
    return fetch('http://localhost:5000/api/cats').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}
export default CatsApi;
