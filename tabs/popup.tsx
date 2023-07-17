import qrcode from "qrcode-generator";
import { useEffect, useState } from "react";
import "./popup.css";

export default function Popup() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // reset style
    document.documentElement!.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";

    try {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      console.log(code);

      if (!code) throw new Error("no code");

      const qr = qrcode(0, "M");
      qr.addData(code);
      qr.make();
      setHtml(qr.createSvgTag());
    } catch (err) {
      console.error(err);
      alert(chrome.i18n.getMessage("generateFail") + err);
      window.close();
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
