import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./App.css";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const postReq = async (data) => {
    try {
      const response = await axios.post(`https://localhost:5050/mongo/api`, {
        firstName: data["First Name"],
        lastName: data["Last name"],
        email: data["Email"],
        password: data["Password"],
        mobileNumber: data["Mobile number"],
        title: data["Title"],
        developer: data["Developer"] === "Yes", // Convert "Yes" to boolean
        married: data["Married"],
        links: data["Link"],
        comments: data["Comments"],
        age: parseInt(data["Age"]), // Convert "21" to number
      });
      console.log("success", response.data);
    } catch (err) {
      console.error("error", err);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    postReq(data);
  };
  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        encType="multipart/form-data"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <input
            type="text"
            placeholder="First Name"
            {...register("First Name", {
              required: true,
              min: 3,
              maxLength: 15,
              pattern: /^[A-Za-z]{3,15}$/i,
            })}
          />
          {errors["First Name"] ? (
            <p style={{ color: "red" }}>*Min:3 Max:15</p>
          ) : null}
          <input
            type="text"
            placeholder="Last name"
            {...register("Last name", {
              required: true,
              min: 2,
              pattern: /^[A-Za-z]{2,10}$/i,
            })}
          />
          {errors["Last name"] ? <p style={{ color: "red" }}>*Min:2</p> : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("Email", {
              required: true,
              min: 2,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            })}
          />
          {errors["Email"] ? (
            <p style={{ color: "red" }}>valid email plz</p>
          ) : null}
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
          {errors["Password"] ? (
            <p style={{ color: "red" }}>
              min:8 max 15 one lower one upper one special
            </p>
          ) : null}
        </div>
        <input
          type="tel"
          placeholder="Mobile number"
          {...register("Mobile number", {
            required: true,
            minLength: 10,
            maxLength: 12,
            pattern: /^[0-9]{10,12}$/i,
          })}
        />
        {errors["Mobile number"] ? (
          <p style={{ color: "red" }}>10-12 digs</p>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <label
            style={{ color: "white", fontSize: 12, fontWeight: 500, margin: 5 }}
          >
            Title
          </label>
          <select {...register("Title", { required: true })} id="ti">
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
          <label
            style={{ color: "white", fontSize: 12, fontWeight: 500, margin: 5 }}
          >
            Developer
          </label>
          <input
            {...register("Developer", { required: true })}
            type="radio"
            value="Yes"
          />
          <input
            {...register("Developer", { required: true })}
            type="radio"
            value="No"
          />
          <label
            style={{ color: "white", fontSize: 12, fontWeight: 500, margin: 5 }}
          >
            Married
          </label>
          <input
            type="checkbox"
            placeholder="Married"
            {...register("Married", { required: true })}
          />
          {errors["Title"] && errors["Developer"] && errors["Married"] ? (
            <p style={{ color: "red" }}>10 digs</p>
          ) : null}
        </div>
        <input
          type="url"
          placeholder="Link"
          {...register("Link", {
            pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
          })}
        />
        {errors["Link"] ? <p style={{ color: "red" }}>https://..</p> : null}
        <textarea
          {...register("Comments", {
            required: true,
            maxLength: 270,
            minLength: 1,
          })}
        />
        {errors["Comments"] ? <p style={{ color: "red" }}>*max:40</p> : null}
        <input
          type="number"
          placeholder="Age"
          {...register("Age", {
            required: true,
            max: 99,
            min: 10,
            maxLength: 2,
            pattern: /^(1[0-9]|[2-9][0-9])$/i,
          })}
        />
        {errors["Age"] ? <p style={{ color: "red" }}>*min 10 max:90</p> : null}
        <input type="submit" />
      </form>
      <form>
        <input
          type="file"
          name="image_uploads"
          {...register("ImageUpload", {
            required: true,
            validate: (value) => {
              const acceptedImageTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
              ];
              if (!value || value.length === 0) {
                return "Please select an image file.";
              }
              for (let i = 0; i < value.length; i++) {
                const file = value[i];
                if (!acceptedImageTypes.includes(file.type)) {
                  return "Please select a valid image file (JPEG, PNG, GIF).";
                }
              }
              return true;
            },
          })}
          accept="image/*"
          multiple
        />
        {errors["ImageUpload"] ? (
          <p style={{ color: "red" }}>{errors.ImageUpload.message}</p>
        ) : null}
        <input
          type="file"
          name="pdf_uploads"
          {...register("PdfUpload", {
            required: true,
            validate: (value) => {
              const acceptedPdfTypes = ["application/pdf"];

              if (!value || value.length === 0) {
                return "Please select at least one PDF file.";
              }

              for (let i = 0; i < value.length; i++) {
                const file = value[i];

                if (!acceptedPdfTypes.includes(file.type)) {
                  return "Please select valid PDF files.";
                }
              }

              return true;
            },
          })}
          accept=".pdf"
          multiple
        />

        {errors["PdfUpload"] ? (
          <p style={{ color: "red" }}>{errors.PdfUpload.message}</p>
        ) : null}
      </form>
      <button type="submit">Submitzzz</button>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
}
