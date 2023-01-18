import Swal from "sweetalert2";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { hideAlert } from "../../slices/alertSlice";

export default function CheckAlert({ children }) {
  const alertState = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    handleSuccessAlert();
    handleErrorAlert();
    handleWarningAlert();
    handleInfoAlert();
  }, [
    alertState.showSuccessAlert,
    alertState.showWarningAlert,
    alertState.showInfoAlert,
    alertState.showErrorAlert,
  ]);

  function handleSuccessAlert() {
    if (!alertState.showSuccessAlert) return;

    let data = alertState.successAlertData;
    Swal.fire({
      ...alertState.defaultConfig,
      title: "Success",
      text: data.content,
      icon: "success",
      didClose: () => {
        dispatch(hideAlert());
      },
    });
  }

  function handleErrorAlert() {
    if (!alertState.showErrorAlert) return;

    let data = alertState.errorAlertData;
    Swal.fire({
      ...alertState.defaultConfig,
      title: "Error",
      text: data.content,
      icon: "error",
      didClose: () => {
        dispatch(hideAlert());
      },
    });
  }

  function handleWarningAlert() {
    if (!alertState.showWarningAlert) return;

    let data = alertState.warningAlertData;
    Swal.fire({
      ...alertState.defaultConfig,
      title: "Warning",
      text: data.content,
      icon: "warning",
      didClose: () => {
        dispatch(hideAlert());
      },
    });
  }

  function handleInfoAlert() {
    if (!alertState.showInfoAlert) return;

    let data = alertState.infoAlertData;
    Swal.fire({
      ...alertState.defaultConfig,
      title: "Info",
      text: data.content,
      icon: "info",
      didClose: () => {
        dispatch(hideAlert());
      },
    });
  }

  return <>{children}</>;
}
