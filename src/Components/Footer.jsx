import "../App.css";

export default function Footer() {
  return (
    <footer className="w-100 py-1 bg-light text-dark mt-2 fixed-bottom footer">
      <div className="container text-center mb-0">
        <small style={{ textDecoration: "underline" }}>
          <span style={{ color: "grey" }}>copyright&copy;</span>{" "}
          <a
            href={"https://www.linkedin.com/in/yesukumiapraku/"}
            target="_blank"
          >
            <span className="my-link">Yesu K. Apraku</span>
          </a>
        </small>
      </div>
    </footer>
  );
}
