import React from 'react';
import './TutorialPage.css';
import Header from './Header';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import designImg from './designImg.png';
import dataImg from './dataImg.png';
import excelImg from './excelImg.png';
import inputImg from './inputImg.png';
import idImg from './idImg.png';
import corrImg from './corrImg.png';
import lineImg from './lineImg.png';
import proteinsImg from './proteinsImg.png';
import topProteinsImg from './topProteinsImg.png';
import pantherImg from './pantherImg.png';



export default class Tutorial extends React.Component {
    render() {
        return (
            <div className='top'>
                <Header />

                <div className='main my-4 mx-auto'>
                    <ListGroup className='sidebar-menu' variant='flush'>
                        <ListGroup.Item>
                            <a className='link' href='#overview-anchor'>Overview</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a className='link' href='#input-anchor'>Input</a>
                            <ListGroup className='px-2' variant='flush'>
                                <ListGroup.Item>
                                    <a className='link' href='#data-file-anchor'>Data File</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#ctrl-rep-anchor'># Non-Labelled Controls</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#ctrl-rep-anchor'># Labelled Replicates</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#tolerance-anchor'>Tolerance</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#format-anchor'>Plot Format</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <a className='link' href='#output-anchor'>Output</a>
                            <ListGroup className='px-2' variant='flush'>
                                 <ListGroup.Item>
                                    <a className='link' href='#output-anchor'>Failed Id Mapping</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#corr-anchor'>Correlation Analysis</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#plot-anchor'>Quality and Cutoff Plots</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#proteins-anchor'>Post-Cutoff Proteome</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#top-proteins-anchor'>Top Surface Proteins</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#panther-anchor'>Location and Function Annotation</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
        
                    <div className='content'>
                    <div className='mx-5'>
                        <h3 className='tutorial-head' id='overview-anchor'>Tutorial</h3>
                    
                        <h4 className='tutorial-title' id='overview'>Overview</h4>
                        <p className='tutorial-text'>
                            In the evolutionary transition from unicellular to multicellular organisms, single cells assembled into highly organized tissues and cooperatively carry out physiological functions. 
                            To act as an integrated system, individual cells communicate with each other extensively through signaling at the cellular interface. 
                            Cell-surface signaling thus controls almost every aspect of the development, physiology, and pathogenesis of multicellular organisms. 
                            In situ cell-surface proteomics or
                            &nbsp;<code className='tutorial-code'>iPEEL</code>&nbsp;
                            (in situ cell-surface proteome extraction by extracellular labeling; developed by Li, Han et al., 2020—PMID: 
                            &nbsp;<a className='tutorial-link' href='https://pubmed.ncbi.nlm.nih.gov/31955847/' target="_blank" rel="noreferrer">31955847</a>&nbsp;
                            and Shuster, Li et al., 2022—PMID: 
                            &nbsp;<a className='tutorial-link' href='https://pubmed.ncbi.nlm.nih.gov/36220098/' target="_blank" rel="noreferrer">36220098</a>
                            ) provides a method for quantitatively profiling cell-surface proteomes in native tissues with cell-type and spatiotemporal specificities. 
                            The 
                            &nbsp;<code className='tutorial-code'>PEELing</code>&nbsp;
                            program and web portal provide an automated, standardized, and easy-to-use analysis pipeline for iPEEL or any other cell-surface proteomics data. 
                            PEELing evaluates data quality using curated 
                            &nbsp;<a className='tutorial-link' href='https://www.sib.swiss/swiss-prot' target="_blank" rel="noreferrer">Swiss-Prot</a>&nbsp;
                            references, performs cut-off analysis to remove contaminants (modified from Hung et al., 2014—PMID: 
                            &nbsp;<a className='tutorial-link' href='https://pubmed.ncbi.nlm.nih.gov/25002142/' target="_blank" rel="noreferrer">25002142</a>
                            ), connects to 
                            &nbsp;<a className='tutorial-link' href='https://www.uniprot.org/'  target="_blank" rel="noreferrer">UniProt</a>&nbsp;
                            and 
                            &nbsp;<a className='tutorial-link' href='http://www.pantherdb.org/' target="_blank" rel="noreferrer">Panther</a>&nbsp;
                            databases for functional annotation, and generates data visualizations. 
                            Together with iPEEL transgenic tools (The Jackson Laboratory: 037697, 037698; Bloomington Drosophila Stock Center: 8763, 9906, 9908), PEELing enables a complete pipeline, from wet lab method to data analysis, for in situ cell-surface proteomics.
                        </p>

                        <p className='my-0 py-3' id='input-anchor'></p>
                        <h4 className='tutorial-title' id='input'>Input</h4>
                        
                        <p className='tutorial-text'>
                            In this tutorial, we use a published dataset (
                            <a className='tutorial-link' href='/api/exampledata'>download</a>
                            ) as an example: the cell-surface proteome of mouse Purkinje cells at postnatal day 15 (Shuster, Li et al., 2022—PMID: 
                            &nbsp;<a className='tutorial-link' href='https://pubmed.ncbi.nlm.nih.gov/36220098/' target="_blank" rel="noreferrer">36220098</a>
                            ). 
                            As shown below in the experimental layout, we performed tandem mass tag (TMT) based quantitative mass spectrometry using 4 TMT channels: 
                            2 for 
                            &nbsp;<span className='highlight'>labelled replicates</span>&nbsp;
                            (129C and 128C; HRP+, H2O2+) and 2 for 
                            &nbsp;<span className='highlight'>non-labelled controls</span>&nbsp;
                            (127C and 127N; HRP or H2O2 omitted).
                        </p>

                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-sm' src={designImg} fluid alt='place holder'></Image>
                        </div>
                        
                        <p className='my-0 py-3' id='data-file-anchor'></p>
                        <h5 className='tutorial-subtitle'>Data File (.tsv)</h5>
                        <p className='tutorial-text'>
                            Upload the data file (.tsv tab-separated value file only) in the following format:
                        </p>
                        <p className='tutorial-text'>
                            <span className='highlight'>The first column contains UniProt accession numbers of proteins </span>(e.g., Q9JHU4). 
                            Although PEELing automatically connects to UniProt and maps accession numbers from user input, it is the best to use updated databases during mass spectrometry data processing to minimize obsolete accession numbers. 
                            &nbsp;<span className='highlight'>Remaining columns contain “labelled-to-control” ratios of proteins.</span>&nbsp; 
                            The “labelled-to-control” ratio can be derived from any mass spectrometry quantification strategy: SILAC, TMT, iTRAQ, label-free, or others. In the provided example using TMT, 2 labelled replicates (129C and 128C) and 2 non-labelled controls (127C and 127N) produce 4 “labelled-to-control” ratios (129C:127C, 129C:127N, 128C:127C, 128C:127N). 
                        </p>
                        <p className='tutorial-text'>
                            <span className='highlight'>The first row lists indexes of “labelled-to-control” ratios.</span>&nbsp;
                            We recommend keeping them informative and concise since these indexes will be displayed in the output.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-md' src={dataImg} fluid alt='place holder'></Image>
                        </div>
                        <p className='tutorial-text'>
                            To convert a .xlsx Excel file to a .tsv file, the user can open it in Excel, export it as “tutorial-Text (Tab delimited) (*.txt)”, and then manually change the file extension from “.txt” to “.tsv”.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={excelImg} fluid alt='place holder'></Image>
                        </div>
                        
                        <p className='my-0 py-3' id='ctrl-rep-anchor'></p>
                        <h5 className='tutorial-subtitle'># Non-Labelled Controls and # Labelled Replicates</h5>
                        <p className='tutorial-text'>
                            In cell-surface proteomic profiling experiments, it is necessary (or exceedingly recommended) to include non-labelled controls, which capture non-specific bead binders and other contaminants and thus enable the cutoff analysis. Please type in the number of non-labelled controls at “# Non-Labelled Controls” (e.g., 2 for the provided example). For “# Labelled Replicates,” please type in the number of cell-surface-labelled replicates (e.g., 2 for the provided example).
                        </p>
                        <p className='tutorial-text'>
                            PEELing expects all possible “labelled-to-control” ratios from the .tsv input file. In the provided example, there are 2 labelled replicates (129C and 128C) and 2 non-labelled controls (127C and 127N). Thus, 4 ratios (129C:127C, 129C:127N, 128C:127C, 128C:127N) should be included in the .tsv file.
                        </p>
                        
                        <p className='my-0 py-3' id='tolerance-anchor'></p>
                        <h5 className='tutorial-subtitle'>Tolerance (optional)</h5>
                        <p className='tutorial-text'>
                            PEELing performs cutoff analysis on each “labelled-to-control” ratio and, for the final proteome, only includes proteins passing cutoff of all/multiple “labelled-to-control” ratios (the intersection of cutoff results of different “labelled-to-control” ratios). The tolerance value here controls how stringent the intersection is. Its default is set as 0, meaning that a protein must pass cutoff of all “labelled-to-control” ratios to be included in the final proteome—in the provided example, a protein must pass cutoff of all 4 ratios to be included. If the tolerance is set as 1, a protein can be filtered out by 1 ratio but still be included in the final proteome—in the provided example, a protein passing cutoff of any 3 ratios is included. We recommend setting the tolerance value to a small number to better filter out contaminants.
                        </p>
                        
                        <p className='my-0 py-3' id='format-anchor'></p>
                        <h5 className='tutorial-subtitle'>Plot Format (optional)</h5>
                        <p className='tutorial-text'>
                            The user can choose the output/downloadable plot format here.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-md' src={inputImg} fluid alt='place holder'></Image>
                        </div>

                        <p className='tutorial-text'>
                            Click “Submit” and take a sip of coffee!
                        </p>

                        <p className='my-0 py-3' id='output-anchor'></p>
                        <h4 className='tutorial-title' id='output'>Output</h4>
                        
                        <h5 className='tutorial-subtitle'>Failed Id Mapping</h5>
                        <p className='tutorial-text'>
                            PEELing automatically maps the protein ids in the user submitted data file to the latest version using the Uniprot API, to get the best match with our updated annotation data. Occasionally the Uniprot server may fail to map some of the ids, possibly due to a temporarily high workload. In this case, PEELing will show the number of failed ids at the top of the Results section. The user can decide whether to resubmit until all ids are successfully mapped. If all ids are successfully mapped, this “Note” information will not appear.                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={idImg} fluid alt='place holder'></Image>
                        </div>
                        
                        <p className='my-0 py-3' id='corr-anchor'></p>
                        <h5 className='tutorial-subtitle'>Correlation Analysis</h5>
                        <p className='tutorial-text'>
                            Correlation plots and coefficients for evaluating whether replicates are consistent with each other or exhibit overall discrepancy.
                        </p>
                        <p className='tutorial-text box px-3 py-3'>
                            <span className='highlight'>Note&nbsp;&nbsp;</span>The heatmap and scatter plot of the default ratio pair are included in the downloaded results. To include a scatter plot of another ratio pair, please make sure to “Make” the plot before downloading. PEELing does not automatically make scatter plots for all ratio pairs.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={corrImg} fluid alt='place holder'></Image>
                        </div>
                        
                        <p className='my-0 py-3' id='plot-anchor'></p>
                        <h5 className='tutorial-subtitle'>Quality Check and Cutoff Plots</h5>
                        <p className='tutorial-text'>
                            For each “labelled-to-control” ratio on the left, selectable tab (e.g., 129C:127C below), two plots are shown:
                        </p>
                        <p className='tutorial-text'>
                            The left plot shows true-positive rate (TPR, blue), false-positive rate (FPR, orange), and difference between TPR and FPR (TPR–FPR, green) along the ratio-based ranking (x-axis). For a successful cell-surface proteome capturing experiment, TPR (blue) ramps up quickly while FPR (orange) increases slowly. Consequently, “TPR–FPR” (green) initially increases and then declines, forming a single maximum peak—where the cutoff is placed.
                        </p>
                        <p className='tutorial-text'>
                            The right plot is a receiver operating characteristic (ROC) curve, in which y-axis represents TPR while x-axis represents FPR. For a successful experiment, the ROC curve bends toward the left-upper corner as shown below. In the ROC curve, the cutoff point is marked as a red dot, along with its corresponding ranking position, protein identify, TPR, and FPR.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={lineImg} fluid alt='place holder'></Image>
                        </div>
                        <p className='tutorial-text'>
                            If the “TPR-FPR” green line in the left plot wiggles up and down without forming a single peak or the ROC curve resembles the diagonal line without bending toward the left-upper corner, the cell-surface proteome capturing is likely suboptimal or failed. Lots of intracellular contaminants are expected to be enriched. In these cases, PEELing is not recommended for cutoff analysis.
                        </p>
                        <p className='tutorial-text'>
                            Plots for all ratios are automatically included in the downloaded results.
                        </p>
                        
                        <p className='my-0 py-3' id='proteins-anchor'></p>
                        <h5 className='tutorial-subtitle'>Post-Cutoff Proteome</h5>
                        <p className='tutorial-text'>
                            List of proteins passing cutoff analysis, as well as their total number.
                        </p>
                        <p className='tutorial-text'>
                            Click each UniProt accession number to jump to the corresponding UniProt protein page.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={proteinsImg} fluid alt='place holder'></Image>
                        </div>
                        
                        <p className='my-0 py-3' id='top-proteins-anchor'></p>
                        <h5 className='tutorial-subtitle'>Top Surface Proteins</h5>
                        <p className='tutorial-text'>
                            List of the top 100 most enriched proteins based on each “labelled-to-control” ratio.
                        </p>
                        <p className='tutorial-text'>
                            Click each UniProt accession number to jump to the corresponding UniProt protein page.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={topProteinsImg} fluid alt='place holder'></Image>
                        </div>
                        
                        <p className='my-0 py-3' id='panther-anchor'></p>
                        <h5 className='tutorial-subtitle'>Protein Location and Function Annotation (Panther)</h5>
                        <p className='tutorial-text'>
                            Select the corresponding organism and click <code className='tutorial-code'>Send</code> to perform protein ontology and pathway analyses of the post-cutoff proteome through the Panther server. Top 10 terms based on false discovery rate (FDR) are listed for protein localization (Panther GO Slim Cellular Component), function (Panther GO Slim Biological Process), and pathway (Reactome).
                        </p>
                        <p className='tutorial-text'>
                            Users can also click <code className='tutorial-code'>Panther</code> in the title to go to Panther’s website to do the analysis, with the protein list from the “Post-Cutoff Proteome” section, or the post-cutoff-proteome.txt file from the downloaded results.                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={pantherImg} fluid alt='place holder'></Image>
                        </div>
                        <p className='tutorial-text  box px-3 py-3'>
                            <span className='highlight'>Note&nbsp;&nbsp;</span> Sometimes the Panther server becomes unresponsive. If it takes too long for the results to come back, please resend the request.
                        </p>
                        
                        <p className='my-0 py-3' id='panther-anchor'></p>
                        <h5 className='tutorial-subtitle'>Download Results</h5>
                        <p className='tutorial-text'>
                            All analysis results including plots are downloadable here.
                        </p>

                    </div>
                </div>
                </div>
                
            </div>
        )
    }
}                    