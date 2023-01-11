import ResetPasswordForm from "../../components/Auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <section className="px-1 py-5 py-md-5 bg-primary bg-opacity-10 h-100">
      <div className="container">
        <ResetPasswordForm />;
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

export default ResetPassword;
