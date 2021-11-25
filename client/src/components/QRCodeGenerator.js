import React, {useEffect, useState} from "react";
import QRCode from "qrcode.react";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({

    qrLink: {
        cursor: 'pointer',
        "&:hover, &:focus": {
            color: theme.palette.secondary.main
        },
        display: 'block'
    },

    qr: {
        textAlign: 'center',
        marginTop: '20px'
    },
}))

const QrCodeGenerator = (props) => {

    const classes = useStyles()

    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "Qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div>
            <div className={classes.qr}>
                {console.log('qrCodeData ', 'text' + props.bodyPost + 'publicKey' + props.publicKey
                    + "signature" + props.signature)
                }
                <QRCode
                    id="123456"
                    value={(props.bodyPost) ? 'text' + props.bodyPost + 'publicKey' + props.publicKey
                        + "signature" + props.signature : ''}
                    size={290}
                    level={"H"}
                />
                <div>
                    <a className={classes.qrLink} onClick={downloadQR}> <span
                        className={classes.text}>Download QR</span> </a>
                </div>
            </div>
        </div>
    )
}

export default QrCodeGenerator