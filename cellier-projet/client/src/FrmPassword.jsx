import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import "./FrmPassword.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import {
    Flex,
    Heading,
    TextField,
    PasswordField,
    Button,
    useTheme,
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
   * L‘état d'erreur
   */
  const [openErr, setOpenErr] = useState(false);

  /**
   * État de l'alerte
   */
  const [severity, setSeverity] = useState([]);

  /**
   * État du message retour
   */
  const [messageRetour, setMessageRetour] = useState([]);

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
    setMessageRetour("");
    setSeverity("");
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, passwordActuel, nouveauPassword);
    })
    .then(data => {console.log(data)
                    if (data) {
                      //setSeverity("success")
                      setMessageRetour("Modification effectuée")
                    }
                  }
          )
    .catch(err => {console.log(err)
                    if (err) {
                      //setSeverity("error")
                      setMessageRetour("Mot de passe invalide")
                    }
                  }
          );
  }

  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    PatchPassword(passwordActuel,passwordNouveau)
    if (messageRetour === "Modification effectuée") {
      setSeverity("success")
    } else {
      setSeverity("error")
    }
    setOpenErr(true)
  }
  
  return (
    <div>
      <Dialog open={frmPasswordOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Modifier votre mot de passe</DialogTitle>
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
            <Dialog open={openErr}>
              <Alert severity={severity}
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpenErr(false);
                    }}
                  >
                  <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {messageRetour}
              </Alert>
            </Dialog>
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
