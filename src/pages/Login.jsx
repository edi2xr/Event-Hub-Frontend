import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const updateCredentials = (inputEvent) => {
    setUserCredentials({ ...userCredentials, [inputEvent.target.name]: inputEvent.target.value });
  };

  const attemptLogin = async (formEvent) => {
    formEvent.preventDefault();
    setIsLoggingIn(true);
    setLoginMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) throw new Error("Hmm, those credentials don't look right");

      const userData = await response.json();
      localStorage.setItem("userToken", userData.token);
      navigate("/events");
    } catch (loginError) {
      setLoginMessage(loginError.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex w-1/2 text-white items-center justify-center p-10 relative overflow-hidden" 
           style={{ 
             backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop)', 
             backgroundSize: 'cover', 
             backgroundPosition: 'center' 
           }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="max-w-md text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">EventHub ✨</h1>
          <p className="text-xl">
            Where memories are made and friendships bloom
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Welcome Home! 🏠
          </h2>

          {loginMessage && (
            <p className="bg-red-100 text-red-600 text-sm p-2 mb-4 rounded">
              {loginMessage}
            </p>
          )}

          <form onSubmit={attemptLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="What's your email address?"
                value={userCredentials.email}
                onChange={updateCredentials}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Your Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your secret password"
                value={userCredentials.password}
                onChange={updateCredentials}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isLoggingIn ? "Getting you in..." : "Let's Go! 🚀"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            New around here?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline"
            >
              Join the fun!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}