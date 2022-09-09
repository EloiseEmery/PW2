import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "./FrmPassword.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import {
    PasswordField,
    Button,
} from '@aws-amplify/ui-react';

export default function FrmPassword({
    setFrmPasswordOuvert,
    frmPasswordOuvert,
    passwordActuel,
    setPasswordActuel,
    passwordNouveau,
    setPasswordNouveau,
}) {


  /**
   *  État des styles des composants MUI
   */
  const Button = styled(MuiButton)((props) => ({
    color: "black",
  }));

  /**
   * État de l'alerte
   */
  const [severity, setSeverity] = useState([]);

  /**
   * État du message retour
   */
  const [messageRetour, setMessageRetour] = useState([]);

  /**
   * État du booléen pour le choix de l'option severity
   */
  const [bool, setBool] = useState(false);

  /**
   * État de l'alerte
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    setFrmPasswordOuvert(false)
  };

  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmPasswordOuvert(false);
  }

  /**
   * requête de modification du password dans aws
   */
  async function PatchPassword(passwordActuel, nouveauPassword) {
    setBool(false);
    setMessageRetour("");
    setSeverity("");
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, passwordActuel, nouveauPassword);
    })
    .then(data => {   
                    console.log(data)
                    setBool(true)
                    setMessageRetour("Modification effectuée")
                    console.log(bool);
                  }
          )
    .catch(err => {
                    console.log(err)
                    setBool(false)
                    setMessageRetour("Mot de passe invalide")
                  }
          );
  }

  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    setSeverity("")
    PatchPassword(passwordActuel,passwordNouveau)
    console.log(messageRetour);
    if (messageRetour === "Modification effectuée") {
      setSeverity("success")
    } else {
      setSeverity("error")
    }
    setOpenAlert(true)
  }
  
  return (
    <div>
      <Dialog PaperProps={{ sx: {backgroundColor: "#f3f5eb"} }} open={frmPasswordOuvert} onClose={viderFermerFrm}>
        <DialogTitle>Modifier votre mot de passe</DialogTitle>
        <DialogContent>
        <div className="frmPassword">
            <PasswordField
              className="PasswordField"
              onChange={(event)=> setPasswordActuel(event.target.value)}
              autoFocus
              label="Mot de passe actuel"
              id="Mot_de_passe_actuel"
            />
            <PasswordField
              className="PasswordField"
              onChange={(event)=> setPasswordNouveau(event.target.value)}
              autoFocus
              descriptiveText="Le mot de passe doit contenir au moins huit caractères"
              label="Nouveau mot de passe"
              id="Nouveau_mot_de_passe"
            />
            <Snackbar
              sx={{ height: "100%" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={openAlert}
              autoHideDuration={1000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={severity}
                sx={{ width: "100%" }}
              >
                  {messageRetour}
              </Alert>
            </Snackbar>
          </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
