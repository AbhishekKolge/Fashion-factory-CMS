import Link from "next/link";

import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <section className="px-1 py-5 py-md-5 bg-primary bg-opacity-10 h-100">
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      loggedInProtected: true,
    },
  };
}

export default LoginPage;
