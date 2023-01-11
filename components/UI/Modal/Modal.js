import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef((props, ref) => {
  const { id, title, actionText, children, size, onSubmit } = props;

  const closeBtnRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        click() {
          closeBtnRef.current.click();
        },
      };
    },
    []
  );

  return createPortal(
    <div className={`modal fade ${size}`} id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form noValidate onSubmit={onSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button
                ref={closeBtnRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {actionText || "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("root-modal")
  );
});

export default Modal;
