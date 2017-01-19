class HobbyApi {
  static getAllHobbies() {
    return fetch('http://localhost:5000/api/hobbies').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}
export default HobbyApi;
