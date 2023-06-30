import React from 'react';
import './TutorialPage.css';
import Header from './Header';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import designImg from './designImg.png';
import tpList from './TutorialPage/tp_list.png';
import dataImg from './dataImg.png';
import excelImg from './excelImg.png';
import inputImg from './TutorialPage/inputImg.png';
import downloadButton from './TutorialPage/downloadButton.png';
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
                                    <a className='link' href='#cellular-compartment-anchor'>Cellular Compartment</a>
                                </ListGroup.Item>
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
                                    <a className='link' href='#output-anchor'>Failed ID Mapping</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#corr-anchor'>Correlation Analysis</a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a className='link' href='#plot-anchor'>Quality Checks and Cutoff Plots</a>
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
                            Molecular compartmentalization is vital for cellular physiology. Spatially-resolved proteomics allows biologists to survey protein composition and dynamics with subcellular resolution. Here, we present <b>PEELing</b> (<b><i>p</i></b>roteome <b><i>e</i></b>xtraction from <b><i>e</i></b>nzymatic <b><i>l</i></b>abel<b><i>ing</i></b> data), an integrated package and user-friendly web service for analyzing spatially-resolved proteomics data. PEELing assesses data quality using curated or user-defined references, performs cutoff analysis to remove contaminants, connects to databases for functional annotation, and generates data visualizations—providing a streamlined and reproducible workflow to explore spatially-resolved proteomics data.
                        </p>

                        <p className='tutorial-text'>
                            Besides this plug-n’-play web portal, PEELing is also available as a command line program at: <a href="https://github.com/JaneliaSciComp/peeling">https://github.com/JaneliaSciComp/peeling</a>.

                        </p>

                        <p className='my-0 py-3' id='input-anchor'></p>
                        <h4 className='tutorial-title' id='input'>Input</h4>

                        <p className='tutorial-text'>
                            In this tutorial, we use a published dataset (
                            <a className='tutorial-link' href='/Example_Data.tsv'>download</a>
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



                        <p className='my-0 py-3' id='cellular-compartment-anchor'></p>
                        <h5 className='tutorial-subtitle'>Cellular Compartment</h5>
                        <p className='tutorial-text'>
                            Choose a cellular compartment to use pre-set references or select “Other (Custom TP / FP lists)” to upload user-defined references.
                        </p>

                        <p className='tutorial-text'>If “Other (Custom TP / FP lists)” is selected, a true positive (TP) reference and a false positive (FP) reference should be uploaded as tab-separated value files (.tsv). Each .tsv file contains only <strong>one column with a header row and then UniProt accession numbers</strong> (e.g., A0A023I7E1).</p>

                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-sm' src={tpList} fluid alt='TP list in an excel file.'></Image>
                        </div>

                        <p>
                            The TP reference contains proteins known to be in the chosen cellular compartment. For instance, the cell-surface TP reference (<a href="Example_Cell-Surface-TP-Reference.tsv">download</a>) is specified by the UniProt term: <i>((cc_scl_term:SL-0112) OR (cc_scl_term:SL-0243) OR (keyword:KW-0732) OR (cc_scl_term:SL-9906) OR (cc_scl_term:SL-9907)) AND (reviewed:true)</i>, which includes SwissProt-reviewed extracellular (SL-0112), secreted (SL-0243), signal peptide-containing (KW-0732), type II transmembrane (SL-9906), and type III transmembrane (SL-9907) proteins.
                        </p>

                        <p>
                            The FP reference contains proteins not localized to the chosen cellular compartment. For instance, the cell-surface FP reference (<a href="Example_Cell-Surface-FP-Reference.tsv">download</a>) is specified by the UniProt term: <i>(((cc_scl_term:SL-0091) OR (cc_scl_term:SL-0173) OR (cc_scl_term:SL-0191)) AND (reviewed:true)) NOT (((cc_scl_term:SL-0112) OR (cc_scl_term:SL-0243) OR (keyword:KW-0732) OR (cc_scl_term:SL-9906) OR (cc_scl_term:SL-9907)) AND (reviewed:true))</i>, including SwissProt-reviewed cytosolic (SL-0091), mitochondrial (SL-0173), and nuclear (SL-0191) proteins that do not express on the cell surface. Some cell-surface proteins, such as the Notch family proteins, are also localized in intracellular compartments and are not considered false positives, and are thus removed from the FP reference.</p>




                        <p className='my-0 py-3' id='data-file-anchor'></p>
                        <h5 className='tutorial-subtitle'>Data File (.tsv)</h5>
                        <p className='tutorial-text'>
                            Upload the data file (.tsv tab-separated value file only) in the following format:
                        </p>
                        <p className='tutorial-text'>
                            <span className='highlight'>The first column contains UniProt accession numbers of proteins </span>(e.g., Q9JHU4).
                            Although PEELing automatically connects to UniProt and maps accession numbers from user input, it is best to use updated databases during mass spectrometry data processing to minimize obsolete accession numbers.
                            &nbsp;<span className='highlight'>Remaining columns contain labelled-to-control ratios of proteins.</span>&nbsp;
                            The labelled-to-control ratio can be derived from any mass spectrometry quantification strategy: SILAC, TMT, iTRAQ, label-free, or others. In the provided example using TMT, 2 labelled replicates (129C and 128C) and 2 non-labelled controls (127C and 127N) produce 4 labelled-to-control ratios (129C:127C, 129C:127N, 128C:127C, 128C:127N).
                        </p>
                        <p className='tutorial-text'>
                            <span className='highlight'>The first row lists indexes of labelled-to-control ratios.</span>&nbsp;
                            We recommend keeping them informative and concise since these indexes will be displayed in the output.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-md' src={dataImg} fluid alt='place holder'></Image>
                        </div>
                        <p className='tutorial-text'>
                            To convert a .xlsx Excel file to a .tsv file, you can open it in Excel, export it as “Text (Tab delimited) (*.txt)”, and then manually change the file extension from “.txt” to “.tsv”.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={excelImg} fluid alt='place holder'></Image>
                        </div>

                        <p className='my-0 py-3' id='ctrl-rep-anchor'></p>
                        <h5 className='tutorial-subtitle'># Non-Labelled Controls and # Labelled Replicates</h5>
                        <p className='tutorial-text'>
                         For spatially-resolved proteomics, it is necessary (or exceedingly recommended) to include non-labelled controls, which capture non-specific bead binders and other contaminants and thus enable the cutoff analysis. Please type in the number of non-labelled controls at “# Non-Labelled Controls” (e.g., 2 for the provided example). For “# Labelled Replicates,” please type in the number of labelled replicates (e.g., 2 for the provided example).
                        </p>
                        <p className='tutorial-text'>
                            PEELing expects all possible labelled-to-control ratios from the .tsv input file. In the provided example, there are 2 labelled replicates (129C and 128C) and 2 non-labelled controls (127C and 127N). Thus, 4 ratios (129C:127C, 129C:127N, 128C:127C, 128C:127N) should be included in the .tsv file.
                        </p>

                        <p className='my-0 py-3' id='tolerance-anchor'></p>
                        <h5 className='tutorial-subtitle'>Tolerance (optional)</h5>
                        <p className='tutorial-text'>
                            PEELing conducts cutoff analysis on all labelled-to-control ratios individually and, for the final proteome, retains only those proteins that pass the cutoff of all or multiple ratios, which further eliminates contaminants. The "Tolerance" setting is optional and enables users to control the stringency of the cutoff. By default, it is set to 0, meaning that a protein must pass the cutoff of all ratios to be included in the final proteome—in the provided example, a protein must pass cutoff of all 4 ratios to be included. If Tolerance is set to 1, a protein can be filtered out by 1 ratio but still be included in the final proteome—in the provided example, a protein passing cutoff of any 3 ratios is included. If Tolerance is set to n, a protein can fail the cutoff in up to n ratios and still be included in the final proteome. We recommend setting the tolerance value to a small number to better filter out contaminants.
                        </p>

                        <p className='my-0 py-3' id='format-anchor'></p>
                        <h5 className='tutorial-subtitle'>Plot Format (optional)</h5>
                        <p className='tutorial-text'>
                            Choose the output/downloadable plot format here.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-md' src={inputImg} fluid alt='place holder'></Image>
                        </div>

                        <p className='tutorial-text'>
                            Click “Submit” and take a sip of coffee!
                        </p>

                        <p className='my-0 py-3' id='output-anchor'></p>
                        <h4 className='tutorial-title' id='output'>Output</h4>

                        <h5 className='tutorial-subtitle'>Failed ID Mapping</h5>
                        <p className='tutorial-text'>
                            In order to obtain the best match with our automatically updated references, PEELing maps protein IDs in the user-submitted data file to the latest version using UniProt API. Occasionally the UniProt server may fail to map some of the IDs, possibly due to a temporarily high workload. In this case, PEELing will show the number of failed IDs at the top of the Results section. The user can resubmit until all IDs are successfully mapped. If all IDs are successfully mapped, this “Note” information will not appear.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={idImg} fluid alt='place holder'></Image>
                        </div>

                        <p className='my-0 py-3' id='corr-anchor'></p>
                        <h5 className='tutorial-subtitle'>Correlation Analysis</h5>
                        <p className='tutorial-text'>
                            Correlation plots and coefficients for evaluating whether replicates are consistent with each other or exhibit overall discrepancy.
                        </p>
                        <p className='tutorial-text box px-3 py-3'>
                            <span className='highlight'>Note&nbsp;&nbsp;</span>The heatmap and the scatter plot of the default ratio pair are included in the downloadable results. To include the scatter plot of another ratio pair, please make sure to “Make” the plot before downloading. PEELing does not automatically make scatter plots for all ratio pairs.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={corrImg} fluid alt='place holder'></Image>
                        </div>

                        <p className='my-0 py-3' id='plot-anchor'></p>
                        <h5 className='tutorial-subtitle'>Quality Checks and Cutoff Plots</h5>
                        <p className='tutorial-text'>
                            For each labelled-to-control ratio on the left, selectable tab (e.g., 129C:127C below), two plots are shown:
                        </p>
                        <p className='tutorial-text'>
                            The left plot shows true-positive rate (TPR, blue), false-positive rate (FPR, orange), and difference between TPR and FPR (TPR–FPR, green) plotted against the ratio-based ranking (x-axis). In a successful enrichment experiment, TPR (blue) increases quickly while FPR (orange) rises slowly. Consequently, “TPR–FPR” (green) initially increases and then declines, forming a single maximum peak—where the cutoff is placed.
                        </p>
                        <p className='tutorial-text'>
                            The right plot is a receiver operating characteristic (ROC) curve, in which y-axis represents TPR while x-axis represents FPR. In a successful experiment, the ROC curve bends toward the left-upper corner as shown below. In the ROC curve, the cutoff point is marked as a red dot, along with its corresponding ranking position, protein identity, TPR, and FPR.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={lineImg} fluid alt='place holder'></Image>
                        </div>
                        <p className='tutorial-text'>
                            If the TPR–FPR value fluctuates up and down without forming a single peak or the ROC curve follows the diagonal line without bending towards the left-upper corner, it suggests suboptimal or failed enrichment. This could be due to an abundance of contaminants being enriched. In such cases, it is not recommended to use PEELing for further analysis. Instead, improved sample preparation or other filtering methods should be considered to address the issue.
                        </p>
                        <p className='tutorial-text'>
                            Plots of all ratios are automatically included in the downloadable results.
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
                            List of the top 100 most enriched proteins based on each labelled-to-control ratio.
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
                            Users can also click “Panther” in the title to go to Panther’s website for this analysis, by submitting the protein list from the “Post-Cutoff Proteome” section or the post-cutoff-proteome.txt file in the downloadable results.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={pantherImg} fluid alt='place holder'></Image>
                        </div>
                        <p className='tutorial-text  box px-3 py-3'>
                            <span className='highlight'>Note&nbsp;&nbsp;</span> Sometimes the Panther server becomes unresponsive. If it takes too long for the results to come back, please resend the request later.
                        </p>

                        <p className='my-0 py-3' id='panther-anchor'></p>
                        <h5 className='tutorial-subtitle'>Download Results</h5>
                        <p className='tutorial-text'>
                            All analysis results including plots are downloadable by clicking on the "Download Results" button.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Image className='my-4 mx-2 tutorial-img-lg' src={downloadButton} fluid alt='place holder'></Image>
                        </div>

                    </div>
                </div>
                </div>

            </div>
        )
    }
}
