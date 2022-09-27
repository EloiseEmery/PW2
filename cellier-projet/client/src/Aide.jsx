import "./Aide.scss";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import etape1 from "./img/png/etape1.png";
import etape2 from "./img/png/etape2.png";
import etape3 from "./img/png/etape3.png";

function Aide(props) {
    return (
      <div className="Aide">
		<div className="Appli--entete">

		</div>
		<div className="Appli--container">
			<div className="Aide--fonctionnement-container">
				<h1>Fonctionnement</h1>
				<div className="Aide--fonctionnement-grid">
					<div className="Aide--fonctionnement-grid-tile">
						<div>
							<h2><AddLocationRoundedIcon  style={{ color: '#f1ab50', width: '15px', marginRight: '10px' }} />Créer votre cellier</h2>
							
							<img
								src={etape1}
								width="70"
								height="40"
								alt="logo-mon-vino"
							></img>
						</div>
						<div>
							<p>Ajouter un nouveau cellier ou modifier le nom du cellier par défaut dans la page d'accueil.</p>
						</div>
					</div>
					<div className="Aide--fonctionnement-grid-tile">
						<div>
							<h2><DownloadRoundedIcon  style={{ color: '#f1ab50', width: '15px', marginRight: '10px' }}/>Importer ou créer une bouteille</h2>
							<img
								src={etape2}
								width="70"
								height="40"
								alt="logo-mon-vino"
							></img>
						</div>
						<div>
							<p>
								Vous pouvez ajouter une bouteille à partir de n'importe où sur l'application.
								Accéder au formulaire d'ajout et choisissez l'importation ou la création d'une bouteille personnalisée. 
								Entrez les informations requises et sélectionnez le cellier de votre choix.
							</p>
							
						</div>
					</div>
					<div className="Aide--fonctionnement-grid-tile">
						<div>
							<h2><SettingsRoundedIcon style={{ color: '#f1ab50', width: '15px', marginRight: '10px' }}/>Gérer et consulter facilement vos celliers</h2>
							
							<img
								src={etape3}
								width="70"
								height="40"
								alt="logo-mon-vino"
							></img>
						</div>
						<div>
							<p>
								Accèder à la page d'accueil pour gérer l'ensemble de vos celliers.
								Cliquez sur votre cellier pour accèder à celui-ci.
								Consultez vos stock de bouteilles contenu dans tout les celliers sur la page Inventaire.
							</p>
						</div>
					</div>
				</div>
				<div className="Aide--questions-container">
					<h2>Questions fréquentes</h2>
					<div className="accordion">
					<Accordion>
						<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: '#f1ab50', height: "20px", width: "20px" }}/>}
						aria-controls="panel1a-content"
						id="panel1a-header"
						>
						<Typography>Première question</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
							malesuada lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: '#f1ab50', height: "20px", width: "20px" }}/>}
						aria-controls="panel2a-content"
						id="panel2a-header"
						>
						<Typography>Deuxième question</Typography>
						</AccordionSummary>
						<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
							malesuada lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
						</AccordionDetails>
					</Accordion>
					</div>
				</div>
			</div>
			<div className="Aide--second-section">
				<div className="Aide--contact-container">
					<h1>Contactez-nous</h1>
					<form>
						<label>Nous vous répondrons dans les plus bref délais</label>
						<input type="text" id="lname" name="lastname" placeholder="Sujet" />
						<label for="subject">Message</label>
						<textarea id="subject" name="subject" placeholder="Écrivez-nous ici.."></textarea>
						<input type="submit" value="Envoyer" disabled />
					</form>
				</div>
			</div>
			</div>
	</div>
    );
}

export default Aide;