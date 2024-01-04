import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Auth = ({ mode }) => {
  const { register, handleSubmit, setError, formState } = useForm();
  const regMode = mode === "signUp" ? "signIn" : "signUp";
  const postReq = async (data) => {
    try {
      await axios.post(`https://localhost:5050/auth/${mode}`, {
        email: data.Email,
        password: data.Password,
      });
      console.log("success");
    } catch (err) {
      console.log("error");
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    if (data.Password !== data["Confirm Password"]) {
      setError("Confirm Password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    postReq(data);
  };

  return (
    <div>
      <h2 style={{ color: "lime" }}>{mode}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
        method="POST"
        action={`/auth/${mode}`}
      >
        <input type="hidden" name="_csrf" value="{{ csrfToken }}"></input>
        <input
          type="email"
          placeholder="Email"
          {...register("Email", {
            required: true,
            min: 2,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
          })}
        />
        {formState.errors["Email"] ? (
          <p style={{ color: "red" }}>valid email plz</p>
        ) : null}
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          {...register("Password", {
            required: true,
            min: 8,
            maxLength: 15,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/i,
          })}
        />
        {formState.errors["Password"] ? (
          <p style={{ color: "red" }}>
            min:8 max 15 one lower one upper one special
          </p>
        ) : null}
        {mode === "signUp" ? (
          <>
            <label>Confirm Password:</label>
            <input
              type="password"
              {...register("Confirm Password", {
                required: true,
                min: 8,
                maxLength: 15,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/i,
              })}
            />
            {formState.errors["Confirm Password"] && (
              <p style={{ color: "red" }}>Pass no match</p>
            )}
          </>
        ) : null}
        <button type="submit">Submit</button>
        <Link to={`/auth/${regMode}`}>
          <button>
            <h3>{regMode}</h3>
          </button>
        </Link>
        <Link to="/">
          <button>
            <h3>Home</h3>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Auth;
