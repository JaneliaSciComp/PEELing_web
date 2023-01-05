import React from 'react';
import Button from 'react-bootstrap/Button';
import './Proteins.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default class Proteins extends React.Component {
    constructor(props) {
        super(props); //resultsId

        this.state = {
            proteins: [],
            //'Q8CD54,E9Q1U1,Q8BPN8,Q3URI6,J3KMH5,Q99K74,P58660,G3UYX5,Q8VE80,Q9Z123,E9QB01,Q2TV84,Q8BP40,E9Q0T8,Q61089,Q9JHE3,P86176,O08742,Q9R100,Q61735,P05533,Q91XY8,O35664,Q80XI6,P19137,Q6ZQA6,Q62351,F6RG10,Q62165,Q3TEW6,Q3TZS3,P31809,P35383,Q66L42,F6XJP7,G3X9Q1,Q9WUP4,F8VQL0,Q8CI95,Q8CFE6,Q6PDJ1,Q9QXY7,P11688,P10852,Q61772,P14094,Q9CWR7,O35988,P06802,P10493,Q8VE98,Q3TH73,P30558,Q8R0L9,O35316,Q64735,Q3V3R4,Q91XA2,P62069,P54761,Q61070,Q6RUT8,P06869,Q9JLB9,Q62178,Q8BGR2,Q8VHF2,Q9CR75,Q8K1S4,P20352,E9QJS7,Q9CQX5,Q9Z0U0,P0CW02,Q9QUK6,Q9EPR4,E9Q2S0,O88343,P54818,O70579,Q80WG5,Q02248,A2ARV4,Q61526,A0A0R4IZW5,E9Q3Q6,Q61009,Q8CFX3,O08747,Q01102,Q9D074,Q8K1S3,Q9Z127,P41274,Q6P9J9,Q6PFY1,A0A0A0MQF2,Q61282,P57716,Q91X,Q8CET2,Q91XX7,Q8R1N0,Q91V88,Q8BTJ4,Q5U4D8,O89001,Q924X6,Q8R3G9,P52800,P37172,Q99JW5,Q62312,P70207,Q80UG2,Q61271,Q91XX4,Q60751,A0A0R4J0A9,Q80W68,P70193,Q3U128,P28571,E9Q7P9,Q9Z0K8,Q61146,Q6P5F7,Q91XY3,Q09143,P13595,P35456,Q9D771,Q9WV91,P29533,Q8CI61,O55026,Q9Z306,Q05928,Q02257,E9QM38,Q8CGF1,A0A0A6YX40,Q06186,Q80XZ4,P58242,E9QKK8,P18572,Q8K0T0,Q03145,Q8VIM0,Q62469,Q61521,P53690,Q8BGK6,P35951,Q6DFX2,O35516,P21956,Q3UZP0,B2RRF0,P13504,Q9Z0L0,Q62181,Q9R1X5,Q7TT36,B2RXS4,A0A0G2JDD1,F8VQC9,Q4PZA2,Q8BIF0,Q8R079,Q8R1U1,Q8BWB6,Q9Z0G9,A0A0R4J117,Q8VDN2,P97370,P97300,Q8K078,O35598,P21995,P15208,Q8R4G6,P32507,Q9Z1P5,Q61165,A2ARI4,Q8BHL4,Q9QXX0,P15379,P48356,P56726,Q8BL99,Q9Z0F8,Q60961,P10404,Q60767,Q69ZQ1,Q8CIP5,Q923J1,Q99KG5,Q3U9N9,A0A140LIH4,Q6PE70,Q9JJY3,Q8R5M8,Q9JIP4,P54754,Q5DU41,P17047,Q07113,Q8K135,P54116,Q7TN83,O88552,Q8CIF6,Q03146,Q8K274,P97929,Q7TMS5,Q9EP73,B2RU80,Q05BQ1,O55101,Q62470,A0A0B4J1F0,A2AKW0,Q9CZQ6,P97326,O88697,Q99LQ1,M0QWP1,Q8C863,O35375,Q62179,Q8JZQ5,Q8BFW6,Q8K094,E9PXF0,Q3TUF7,P26952,A0A1B0GT29,Q5FWI3,P43406,Q922T2,Q64455,A0A087WQT1,Q8BGT1,Q61739,P49769,Q80YQ1,Q00560,O35632,Q9EQ09,Q91VH1,P17809,P97333,P98156,O09126,P15116,Q64695,E9PXB7,Q923T9,Q9JIS8,P58659,Q91VN0,Q80TR1,Q99N48,Q62273,Q810U4,Q05909,Q9ER62,Q9WU60,E9Q236,Q3UHI0,Q9WTR6,Q8VI59,Q01887,P04768,Q8VBW1,Q32NY4,E9PXQ7,O08532,Q8BMC0,Q6PGJ3,A2RS43,Q3UR85,Q8BJD1,O88792,P29268,Q8C2H7,P09055,Q922P8,Q9CZG9,Q9D4J3,G5E8Q8,Q8K1G2,P34914,A0A0R4J1K9,O35379,P27038,Q61503,Q9QZM4,Q60943,Q80V42,Q8R502,Q03137,P23188,F8VPQ6,P82347,G3UW74,Q52KR2,P70206,Q9EPU5,Q7M6Y5,Q8C0Z1,Q8C129,P97792,Q69ZF7,B2RQY6,P22777,Q68FH0,Q8BZZ3,Q80T21,Q9JL15,Q01341,Q9QZB1,Q8JZR6,F7AC58,Q91V35,A2A8L5,Q9DBH0,Q8BNJ6,Q80TS3,Q64151,Q7TN12,P52795,Q9R0M4,P36895,P23242,Q8QZY6,Q8BUE4,P51863,P49817,O54967,Q8CHV6,Q6P2L7,Q06890,Q76KF0,Q8K1,A0A140LIX9,Q9JLL0,Q60766,D3Z2R5,Q9QZF2,Q8VDZ4,Q80W65,Q9CQ73,Q61072,O35607,Q61190,A2A864,Q5NCJ1,P07214,Q91Z69,P70275,Q91VA6,Q9D7P6,Q61187,Q91V24,P39061,Q9WUU8,Q60709,Q80Y,O88856,Q8BFR4,P11438,P10810,Q01279,Q9QXH4,Q8VIB3,Q810S1,Q6KAQ7,E9Q7N4,P11214,P50284,O88968,P98064,E9Q616,E9Q9B7,Q3UHH2,A2CG49,Q6RHR9,P70424,G3UYX7,Q9ESU7,Q8C1E7,Q99JB2,O35604,Q6A051,Q9WU78,E9PUL3,Q99KW9,Q8C561,Q3TCN2,Q69ZU6,P40237,Q5JCS9,Q8BM72,Q4VA93,Q61730,Q9WTR5,Q8BL06,Q9JIG8,Q8R143,P01901,Q9WVD4,P58022,Q64729,P70208,Q8BTH8,Q9D1Q4,Q69ZN7,Q9QXY9,D4AFX7,Q8CJ19,O55111,O54951,Q9D3R1,Q8BR63,Q9Z0Z4,Q3TWI9,Q8BXL7,B0V2N1,A2AQ25,P15261,Q3ULC4,B2RXV4,Q80UP5,P60060,A2AG68,Q3TBT3,G5E874,P98192,Q6PI17,O08992,P33896,G5E8S8,Q9QUR8,Q8R0J7,P17439,Q924C6,Q9CQ10,Q6NZQ2,O70433,Q9R059,Q61115,Q91XL3,O08573,P16045,Q78HU3,Q61468,G5E829,P97477,Q9JJ00,Q9R1Q6,Q61263,P16054,Q9CWG1,Q9EQJ0,P24668,P18406,Q3UKC1,Q9D2J4,A2AJN7,O70503,Q8BJZ3,Q8K2C8,Q00PI9,Q99MR3,O08917,Q61609,Q9D304,O35405,Q9D1C8,O09159,P23780,Q8BM55,B2R2,A2AMH5,Q8CHK3,Q03142,Q8C006,Q3TTY0,Q64337,Q9EPT5,Q99PL7,Q8VI47,Q8VBT0,Q91V01,Q8BR76,Q3UMB5,Q9Z1G4,Q3UM83,Q9CRY7,Q3UH93,Q60841,Q8R0I4,Q9CQU3,Q8BHI7,Q9EPK2,Q3UHD6,Q5SRY7,Q9CZT5,Q8C4X2,Q791V5,Q6ZQI3,Q91V08,Q9EQD0,Q6S5C2,Q9WUH7,P26231,P59470,Q8K448,P41438,A2APB8,Q6DVA0,O54890,Q8BHS3,Q6PHZ2,Q9WTP2,Q8BR65,Q99JY8,Q4VBE8,P11370,O88325,Q9D6K9,Q8CBQ5,Q8C3X8,Q9D7J6,Q8R1U2,Q2M3X8,Q3U5F4,Q6ZWV3,Q8BIG7,P10107,P97742,Q8VEK0,Q8BT60,Q61088,Q501J2,Q8K2J7,Q3TDN0,P46935,Q07797,Q91YN9,Q9WV55,H3BL08,P21447,Q3UXS0,P35293,Q6ZWR6,Q8BXN9,E9Q6Y8".replaceAll(',', ', '),
            error: null,
            copied: false,
        }
    }


    componentDidMount() {
        //TODO: change url
        fetch('/api/proteins/'+this.props.resultsId, {
            method: 'GET'
        }).then(res => {
            //console.log(res);
            if (res.ok) {
                return res.json(); //TODO: await?
            } else {
                this.setState({error: res.statusText}); 
            }
        }).then(res => {
            if (res['error']) {
                this.setState({error: res['error']});
            } else {
                this.setState({proteins: res['protein_list']}); 
            }
        })
    }


    render() {
        return (
            <div className='proteins subsection'>
                <h4 className='subsection-title my-5 px-4'>Surface Proteins</h4>

                {this.state.error ?
                <div className='info-error mx-4 my-5 d-flex flex-column align-content-center'>
                    <p>Oops! Proteins went wrong!</p>
                </div>
                :
                <div>
                    <div className='mx-4 mb-2 d-flex justify-content-between align-items-end'>
                        <span className='info'>({this.state.proteins.length} surface proteins found)</span>
                        <CopyToClipboard text={this.state.proteins.join(',')}
                          onCopy={() => this.setState({copied: true})}>
                            <Button className='btn' variant="outline-primary" size='sm'>{this.state.copied ? 'Copied' : 'Copy List'}</Button>
                        </CopyToClipboard>
                    </div>
                    <div className='box box-protein mx-3'>
                    {this.state.proteins.map((protein, i) => 
                        <a key={i} className='link protein-link' href={'https://www.uniprot.org/uniprotkb/'+protein}  target="_blank" rel="noreferrer">
                            {i<this.state.proteins.length-1 ? protein+', ' : protein}
                        </a>
                    )}
                    </div>
                </div>
                
                }
            </div>
        )
    }
}
