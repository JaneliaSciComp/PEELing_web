# PEELing Web Portal

### Introduction
In the evolutionary transition from unicellular to multicellular organisms, single cells assemble into highly organized tissues and cooperatively carry out physiological functions. To act as an integrated system, individual cells communicate with each other extensively through signaling at the cellular interface. Cell-surface signaling thus controls almost every aspect of the development, physiology, and pathogenesis of multicellular organisms. In situ cell-surface proteomics or `iPEEL` (in situ cell-surface proteome extraction by extracellular labeling; developed by [Li, Han et al., 2020](https://pubmed.ncbi.nlm.nih.gov/31955847/) — `PMID: 31955847` and [Shuster, Li et al., 2022](https://pubmed.ncbi.nlm.nih.gov/36220098/) — `PMID: 36220098`) provides a method for quantitatively profiling cell-surface proteomes in native tissues with cell-type and spatiotemporal specificities. 

This `PEELing` web portal provides an automated, standardized, and easy-to-use analysis pipeline for iPEEL or any other cell-surface proteomics data. PEELing evaluates data quality using curated [Swiss-Prot](https://www.sib.swiss/swiss-prot)  references, performs cut-off analysis to remove contaminants (modified from [Hung et al., 2014](https://pubmed.ncbi.nlm.nih.gov/25002142/) — `PMID:  25002142`), connects to [UniProt](https://www.uniprot.org/) and [Panther](http://www.pantherdb.org/) databases for functional annotation, and generates data visualizations. Together with iPEEL transgenic tools (The Jackson Laboratory: 037697, 037698; Bloomington Drosophila Stock Center: 8763, 9906, 9908), PEELing enables a complete pipeline, from wet lab method to data analysis, for in situ cell-surface proteomics.


### Web Portal Address
[http://peeling.janelia.org](http://peeling.janelia.org)


### Tutorial
[http://peeling.janelia.org/tutorial](http://peeling.janelia.org/tutorial)


### Command Line Program
`PEELing` also provides a command line program. Please refer to this [repo](https://github.com/JaneliaSciComp/peeling)