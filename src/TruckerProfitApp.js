import React, { useState } from "react";

export default function TruckerProfitApp() {
  const [dotNumber, setDotNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyDOT = async () => {
    if (!dotNumber) return;
    setLoading(true);
    try {
      const res = await fetch(`https://truckers-profit-backend-production.up.railway.app/api/verify/dot/${dotNumber}`);
      const data = await res.json();

      const carrier = data.content?.carrier || {};
      setVerificationResult({
        status: "Success",
        entity: carrier.legalName || "No Name Found",
        mcNumber: carrier.mcNumber || "Not Available",
        dotNumber: carrier.dotNumber || dotNumber,
        allowToOperate: carrier.allowedToOperate || "Unknown",
        outOfService: carrier.outOfService || "N",
        outOfServiceDate: carrier.oosDate || "N/A",
        complaintCount: carrier.complaintCount || 0,
        phyStreet: carrier.phyStreet || "Unknown",
        city: carrier.phyCity || "Unknown",
        state: carrier.phyState || "Unknown",
        zip: carrier.phyZipcode || "Unknown",
        phone: carrier.telephone || "Unknown",
        email: carrier.email || "Unknown",
        operationDesc: carrier.carrierOperation?.carrierOperationDesc || "Unknown",
        totalDrivers: carrier.totalDrivers || "Unknown",
        totalPowerUnits: carrier.totalPowerUnits || "Unknown",
        statusCode: carrier.statusCode || "Unknown",
        details: data
      });
    } catch (err) {
      setVerificationResult({ status: "Error", message: "API request failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (verificationResult?.phone) {
      window.location.href = `tel:${verificationResult.phone}`;
    }
  };

  const handleEmail = () => {
    if (verificationResult?.email) {
      window.location.href = `mailto:${verificationResult.email}`;
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/assets/truckers-profit-logo.png" alt="Truckers Profit Logo" style={{ height: "80px" }} />
      </div>

      <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>Carrier Verification</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter DOT Number"
          value={dotNumber}
          onChange={(e) => setDotNumber(e.target.value)}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />

        <button
          onClick={verifyDOT}
          disabled={loading}
          style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "6px" }}
        >
          {loading ? "Loading..." : "Verify DOT"}
        </button>
      </div>

      {verificationResult && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <p><strong>Entity:</strong> {verificationResult.entity}</p>
          <p>MC Number: {verificationResult.mcNumber}</p>
          <p>DOT Number: {verificationResult.dotNumber}</p>
          <p><strong>Allowed to Operate:</strong> {verificationResult.allowToOperate}</p>
          <p><strong>Out of Service:</strong> {verificationResult.outOfService}</p>
          <p>Out of Service Date: {verificationResult.outOfServiceDate}</p>
          <p>Complaints: {verificationResult.complaintCount}</p>
          <p><strong>Location:</strong> {verificationResult.phyStreet}, {verificationResult.city}, {verificationResult.state}, {verificationResult.zip}</p>
          <p><strong>Operation:</strong> {verificationResult.operationDesc}</p>
          <p><strong>Total Drivers:</strong> {verificationResult.totalDrivers}</p>
          <p><strong>Total Power Units:</strong> {verificationResult.totalPowerUnits}</p>
          <p><strong>Status Code:</strong> {verificationResult.statusCode}</p>
          <p><strong>Phone:</strong> {verificationResult.phone}</p>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={handleCall} style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: "6px" }}>Call</button>
            <button onClick={handleEmail} style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "6px" }}>Send Email</button>
          </div>

          {verificationResult.message && <p style={{ color: "red", marginTop: "10px" }}>Message: {verificationResult.message}</p>}
        </div>
      )}
    </div>
  );
}
