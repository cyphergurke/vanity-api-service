export default function deMail(vaddr: string, partialPriv: string) {
    const mailtext = `
    Ihre Bestellung wurde bearbeitet und Ihre angegebene Adresse erfolgreich berechnet.

Ihre öffentliche Adresse lautet: ${vaddr}
Ihr teilweiser privater Schlüssel: ${partialPriv}
https://vanity-split-key-merge.bitcoin-uni.de/${vaddr}/${partialPriv}
Ihr privater Schlüssel: von Ihnen gespeichert (bei der Erstellung des Schlüsselpaares).

Der nächste und damit letzte Schritt ist nun, Ihren endgültigen privaten Schlüssel zu berechnen, indem Sie Ihren gespeicherten privaten Schlüssel (bei der Erstellung des Schlüsselpaares) und den teilweisen privaten Schlüssel verwenden.

Für eine sichere Berechnung des privaten Schlüssels (Schlüsselzusammenführung) empfehlen wir, den folgenden Link im Inkognito-Modus zu öffnen (Rechtsklick auf den Link -> „Link im Inkognito-Modus öffnen“) und vor der Berechnung offline zu gehen.
Klicken Sie hier, um Ihren endgültigen privaten Schlüssel zu berechnen.

ACHTUNG: Speichern Sie den berechneten privaten Schlüssel an einem sicheren Ort und teilen Sie ihn mit niemandem.

Bei Fragen wenden Sie sich bitte an unseren Support info@bitcoin-uni.de.

Bitte unterstützen Sie uns, indem Sie spenden und diesen Dienst auf Twitter oder anderswo teilen.

Folgen Sie uns auf Instagram und Twitter.
      `

    const mailHTML = `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>VanityAddressKey</title>
    <!-- FONT-AWESOME 4.7.0 -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">


    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            min-width: 100% !important;
            font-family: arial
        }

        .content {
            width: 100%;
            max-width: 700px;
        }

        h1,
        h2,
        h3,
        h4 {
            margin: .3rem .5rem 1rem;

        }

        h1 {
            padding: .5rem;
        }

        .wrapper {
            /*text-align: center;*/
            padding: 0 1rem;

        }

        .btn {
            background-color: black;
            border-color: #ffe70e !important;
            font-size: 20px;
            display: inline-block;
            padding: 1rem;
            border-radius: 4px;

        }

        .key {

            margin-bottom: 1rem;
            display: inline-block;
            font-size: 22px;
        }

        .green {
            color: green;
        }

        .red {
            color: red;
        }

        a.btn:link,
        a.btn:visited {
            color: #ffe70e;
            text-decoration: none;
            border-color: #ffe70e;
        }

        a.btn:focus,
        a.btn:hover,
        a.btn:active {
            color: white;
        }

        a:link,
        a:visited {
            color: #ffe70e;
            text-decoration: none;
        }

        a:focus,
        a:hover,
        a:active {
            color: rgb(87, 74, 0);
        }

        .icons {
            font-size: 30px;
        }
    </style>
</head>

<body yahoo bgcolor="#fff">
    <table width="100%" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <table class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="color: white; background-color: #111;">
                            <div style="text-align: center; background-color: black;">
                                <br>
                                <h1 style="font-weight: 50; color: #ffe70e; text-align: center;">Vanity Adressen
                                    Generator</h1>
                                <h2 style="font-weight: 50;">Die Adresse wurde gefunden!</h2>

                                <br>
                                <hr color="#ffe70e">
                            </div>

                            <div style="padding:0 30px 0 30px">
                                <p>Ihre Bestellung wurde bearbeitet und Ihre gewünschte Adresse erfolgreich
                                    berechnet.
                                    Lesen Sie diese Anleitung sorgfältig durch
                                <h3>Vanity Adresse:</h3>
                                <span id="vaddr" class="green key">${vaddr}</span>
                                <br />
                                <h3>Der Partielle Private Schlüssel:</h3>
                                <span id="partkey" class="green key">${partialPriv}</span>
                                <br />
                                <h3>Ihr privater Schlüssel:</h3>
                                <span class="red key"> Von Ihnen gespeichert (bei der Erstellung des
                                    Schlüsselpaares).</span>
                                <br />

                                <br>
                                Im nächsten Schritt müssen der partielle Schlüssel und Ihr privater schlüssel von Ihnen
                                zusammengefügt werden.
                                Dazu stehen Ihnen mehrere möglichkeiten zur Verfügung.
                                <br> <br><br> <br>
                                <div style="text-align: center;">
                                    <span class="red key ">Das zusammenfügen der Schlüssel sollte nur offline
                                        durchgeführt werden!</span>

                                </div>
                                <p>
                                    <span style="color: red">Achtung: </span> Speichern Sie den berechneten privaten
                                    Schlüssel an einem
                                    sicheren Ort und geben Sie ihn nicht ihn nicht weiter. Sie können dafür eine Bitcoin
                                    Wallet verwenden.
                                </p>
                                <br> <br>
                                <strong>Webapp:</strong><br>
                                Für eine sichere Berechnung des privaten Schlüssels (Key Merging), <br>
                                empfehlen wir ihnen den folgenden Link im (privaten Tab) Inkognito-Modus zu öffnen<br>
                                (Rechtsklick auf den Link -> "Link im Inkognitomodus öffnen"),<br />
                                und vor der Berechnung offline zu gehen.

                                </p>
                                <div style="text-align: center;">
                                    <a style="font-weight: 100; font-size: 22px;"
                                        href="https://vanity-split-key-merge.bitcoin-uni.de/${vaddr}/${partialPriv}"><i
                                            class="fa fa-key" aria-hidden="true"></i><i class="fa fa-compress"
                                            aria-hidden="true"></i> KEY
                                        MERGING Webapp
                                    </a>
                                </div>

                                <br>
                                <strong>PWA App:</strong>
                                <p>Laden Sie das Keymerging-Tool als Progressive Web Application auf Ihr Smartphone oder
                                    Desktop herunter. Funktioniert nur mit dem Chrome, Edge oder Brave Browser.
                                </p>
                                <p>Klicken Sie auf den folgenden Button, es öffnet sich das Keymerging Tool in Ihrem
                                    Browser, klicken Sie nun auf das plus Zeichen (Desktop) am Ende der Domain-Zeile
                                    (https://...), um die App lokal zu installieren.
                                </p>
                                <p>In Ihrem Smartphone-Browser wird eine Information zur Installation der App angezeigt,
                                    oder gehen Sie auf
                                    Optionen
                                    und klicken Sie auf
                                    'Anwendung installieren'.</p>
                           


                                <strong>GitHub:</strong>
                                <p>

                                    Sie können auch direkt den Quellcode verwenden, laden sie ihn von GitHub
                                    herunter und öffnen die Datei vmerge.html.
                                </p>

                                <div style="text-align: center;">


                                    <a style="font-size: 22px; text-align: center;"
                                        href="https://github.com/cyphergurke/vanity-split-key-merging">Github
                                        VanityAddressMerger</a>
                                    </a>
                                    <br><br> <br>
                                    <a href="https://vanity-address.bitcoin-uni.de/sites/faq-vanity-address.html">
                                        Guide
                                    </a> <br> </a> <br>
                                    <a href="https://vanity-address.bitcoin-uni.de/sites/faq-vanity-address.html">
                                        FAQ - Vanity Addresses
                                    </a> <br>
                                </div>
                                <br>
                                <br>
                                <strong>Wallets:</strong>
                                <p>
                                    Electrum, Mycelium & Bluewallet.
                                </p>
                                <br>
                                <p style="text-align: center;">
                                    Bei Fragen wenden Sie sich bitte an den <a
                                        href="mailto:info@bitcoin-uni.de">Support</a>
                                </p>
                            </div>

                            <br>
                            <div
                                style="text-align:center; color: white; background-color: rgb(0, 0, 0); border-radius: 5px;">
                                <hr color="#ffe70e">
                                <br>
                                <a style="margin-right:10px" href="https://twitter.com/cryptxraver">
                                    <i class="bi bi-twitter icons"></i>Twitter
                                </a>
                                <a style="margin-right:10px" href="https://t.me/bitcoin_uni_support">
                                    <i class="bi bi-telegram icons"></i>Telegram
                                </a>
                                <a style="margin-right:10px" href="https://www.instagram.com/bitcoin_cypher_uni/">
                                    <i class="bi bi-instagram icons"></i>Instagram
                                </a>
                                <a href="https://bitcointalk.org/index.php?topic=5281176.0">
                                    <i class="fa fa-btc icons"></i>Bitcointalk
                                </a>
                                <br>

                                <p>Hinterlasse gerne eine Spende für weitere Entwicklungen</p>
                                <p><b>3BitunigscbkbD6pRpRN32S79UZqJhTxge</b></p>

                                <br>
                                <a href="https://vanity-address.bitcoin-uni.de/sites/impressum.html">
                                    Impressum
                                </a> <br><a href="https://vanity-address.bitcoin-uni.de/sites/impressum.html">
                                    General Terms and Conditions
                                </a>
                                <br><br>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>


</html>
`
    const mailContent = { mailtext: mailtext, mailHTML: mailHTML }
    return mailContent
}
