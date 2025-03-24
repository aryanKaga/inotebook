


export async function SignIn() {

  const Username = document.getElementById('Sign_username').value;
  const Email = document.getElementById('email').value;
  const Password = document.getElementById('password').value;
  const userObject = { username: Username, email: Email, password: Password };

  try {
      const resp = await fetch('http://localhost:5000/auth/Signup', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userObject),
          credentials:"include"
      });
      console.log(resp);
      if (resp.status === 409) {
          alert("User already exists! Please try logging in.");
          return false;
      } else if (resp.ok) {
          alert("Signup successful! You can now log in.");
          
          return true;
      } else {
          alert("Error signing up. Please try again.");
          return false;
      }
  } catch (error) {
      console.error("Signup Error:", error);
      alert("Network error! Please check your connection.");
      return false;
  }
}

export async function Login() {
  const Username = document.getElementById('Log_username').value;
  const Password = document.getElementById('password').value;
  const userObject = { username: Username, password: Password };

  try {
      const resp = await fetch('http://localhost:5000/auth/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userObject),
          credentials:"include"
      });
      console.log(resp);
      if (resp.status === 409) {
          alert("Invalid credentials! Please check your username and password.");
          return false;
      }
      else if(resp.status===200){
        return true;
      }
       else if (resp.ok) {
          return true;
      } else {
          alert("Error logging in. Please try again.");
          return false;
      }
  } catch (error) {
      console.error("Login Error:", error);
      alert("Network error! Please check your connection.");
      return false;
  }
}
