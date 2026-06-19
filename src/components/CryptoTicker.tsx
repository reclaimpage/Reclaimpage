"use client";

import React from "react";

export function CryptoTicker() {
  return (
    <div className="w-full bg-obsidian border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div style={{
          height: "62px",
          backgroundColor: "#1B2030",
          overflow: "hidden",
          boxSizing: "border-box",
          border: "1px solid #56667F",
          borderRadius: "4px",
          textAlign: "right",
          lineHeight: "14px",
          fontSize: "12px",
          fontFeatureSettings: "normal",
          textSizeAdjust: "100%",
          boxShadow: "inset 0 -20px 0 0 #56667F",
          padding: "0px",
          margin: "0px",
          width: "100%"
        }}>
          <div style={{ height: "42px", padding: "0px", margin: "0px", width: "100%" }}>
            <iframe 
              src="https://coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=" 
              width="100%" 
              height="42px" 
              scrolling="auto" 
              marginWidth={0} 
              marginHeight={0} 
              frameBorder="0" 
              style={{ border: 0, margin: 0, padding: 0 }}
            ></iframe>
          </div>
          <div style={{
            color: "#FFFFFF",
            lineHeight: "14px",
            fontWeight: 400,
            fontSize: "11px",
            boxSizing: "border-box",
            padding: "2px 6px",
            width: "100%",
            fontFamily: "Verdana, Tahoma, Arial, sans-serif"
          }}>
            <a href="https://coinlib.io" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500, color: "#FFFFFF", textDecoration: "none", fontSize: "11px" }}>
              Cryptocurrency Prices
            </a>&nbsp;by Coinlib
          </div>
        </div>
      </div>
    </div>
  );
}
