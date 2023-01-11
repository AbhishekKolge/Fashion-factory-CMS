import Link from "next/link";

const SettingsPage = () => {
  return (
    <section className="h-100">
      <h2 className="text-bold">Settings</h2>
      <span>Manage the settings for your store</span>
      <div className="row py-4">
        <div className="col-6 p-2">
          <Link href="/settings/profile" className="reset-link">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between gap-2">
                <div>
                  <h5>Personal Information</h5>
                  <span>Manage your admin profile</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-6 p-2">
          <Link href="/settings/return-reason" className="reset-link">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between gap-2">
                <div>
                  <h5>Return Reasons</h5>
                  <span>Manage order settings</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-6 p-2">
          <Link href="/settings/categories" className="reset-link">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between gap-2">
                <div>
                  <h5>Add Categories</h5>
                  <span>Manage product categories</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-6 p-2">
          <Link href="/settings/sizes" className="reset-link">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between gap-2">
                <div>
                  <h5>Add Sizes</h5>
                  <span>Manage product sizes</span>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
