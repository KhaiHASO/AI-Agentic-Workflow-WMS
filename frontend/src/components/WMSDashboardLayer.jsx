import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { wmsApi } from "../services/wmsApi";
import authService from "../services/authService";

const WMSDashboardLayer = () => {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = authService.getCurrentUser();
        setUser(userData);
        const dashboardData = await wmsApi.fetchDashboardSummary();
        setStats(dashboardData);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading WMS Dashboard...</div>;

  const role = user?.roles?.[0] || "User";

  // RENDER LOGIC PER ROLE
  const renderWorkerDashboard = () => (
    <div className='row gy-4'>
      <div className='col-md-6 col-lg-3'>
        <div className='card h-100 p-20 radius-12 bg-primary-600 text-white'>
          <h6 className='text-white mb-4'>Putaway Tasks</h6>
          <h2 className='text-white mb-8'>{stats.worker.pendingPutaway}</h2>
          <p className='text-white-75'>Pending in Staging</p>
          <Icon icon='mdi:forklift' className='position-absolute end-0 top-0 mt-16 me-16 opacity-25 text-64' />
        </div>
      </div>
      <div className='col-md-6 col-lg-3'>
        <div className='card h-100 p-20 radius-12 bg-success-600 text-white'>
          <h6 className='text-white mb-4'>Picking Tasks</h6>
          <h2 className='text-white mb-8'>{stats.worker.pendingPick}</h2>
          <p className='text-white-75'>Open for Fulfillment</p>
          <Icon icon='mdi:package-variant-closed' className='position-absolute end-0 top-0 mt-16 me-16 opacity-25 text-64' />
        </div>
      </div>
      {/* Quick Action for Worker */}
      <div className='col-12'>
        <div className='card p-24 radius-12'>
          <h5>Your Next Tasks</h5>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Scan Receipt #REC-1001 for Putaway
              <button className='btn btn-sm btn-outline-primary'>Go to Scanner</button>
            </li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
              Pick 5x SKU-A for SO-2026-001
              <button className='btn btn-sm btn-outline-success'>Start Picking</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderSupervisorDashboard = () => (
    <div className='row gy-4'>
       <div className='col-md-6 col-lg-4'>
        <div className='card p-24 radius-12 border-start border-danger border-4'>
          <h6 className='text-secondary-light mb-8'>Inventory Under QA Hold</h6>
          <h3 className='mb-0'>{stats.supervisor.qaHoldItems} Items</h3>
          <span className='text-xs text-danger mt-8'>Action Required: Release or Reject</span>
        </div>
      </div>
      <div className='col-md-6 col-lg-4'>
        <div className='card p-24 radius-12 border-start border-warning border-4'>
          <h6 className='text-secondary-light mb-8'>Open POs (Stage)</h6>
          <h3 className='mb-0'>{stats.supervisor.openPOs} Orders</h3>
          <span className='text-xs text-warning mt-8'>Waiting for sync to Core</span>
        </div>
      </div>
      <div className='col-md-6 col-lg-4'>
        <div className='card p-24 radius-12 border-start border-primary border-4'>
          <h6 className='text-secondary-light mb-8'>Team Utilization</h6>
          <h3 className='mb-0'>82%</h3>
          <div className='progress mt-8' style={{ height: "6px" }}>
            <div className='progress-bar bg-primary' style={{ width: "82%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQCDashboard = () => (
    <div className='row gy-4'>
      <div className='col-12'>
        <div className='card p-24 radius-12 border-danger'>
          <div className='d-flex align-items-center gap-12 mb-16'>
            <Icon icon='ph:warning-circle-bold' className='text-danger text-32' />
            <h5 className='mb-0'>Critical Quality Alert</h5>
          </div>
          <p>There are <strong>{stats.qc.itemsToInspect}</strong> items currently locked in <strong>QA Hold</strong> status. Inspect these batches immediately to maintain warehouse flow.</p>
          <button className='btn btn-danger w-auto'>Go to Quality Orders</button>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className='row gy-4'>
      <div className='col-md-6 col-lg-3'>
        <div className='card p-20 radius-12 text-center bg-dark text-white'>
          <Icon icon='carbon:api' className='text-48 mx-auto mb-12 text-warning' />
          <h6>API Errors (24h)</h6>
          <h2>{stats.admin.apiErrors}</h2>
        </div>
      </div>
      <div className='col-md-6 col-lg-3'>
        <div className='card p-20 radius-12 text-center bg-base border'>
          <Icon icon='ph:users-four-bold' className='text-48 mx-auto mb-12 text-primary' />
          <h6>Total Active Users</h6>
          <h2>{stats.admin.totalUsers}</h2>
        </div>
      </div>
      <div className='col-12'>
        <div className='card p-24 radius-12'>
          <h5>Integration Outbox Status</h5>
          <div className='d-flex gap-24 mt-16'>
            <div className='text-success'><Icon icon='mdi:check-circle' /> 1,240 Success</div>
            <div className='text-danger'><Icon icon='mdi:alert-circle' /> 5 Failed</div>
            <div className='text-warning'><Icon icon='mdi:clock-outline' /> 12 Pending</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-between align-items-center mb-24'>
        <div>
          <h4 className='mb-4'>Welcome back, {user.fullName}</h4>
          <p className='text-secondary-light mb-0'>Your Role: <span className='badge bg-info-focus text-info-600'>{role}</span></p>
        </div>
        <div className='text-end'>
          <p className='text-xs mb-0'>System Status</p>
          <span className='badge bg-success-focus text-success-600'>● Online</span>
        </div>
      </div>

      {role === "Worker" && renderWorkerDashboard()}
      {role === "Supervisor" && renderSupervisorDashboard()}
      {role === "QA_QC" && renderQCDashboard()}
      {role === "Admin" && renderAdminDashboard()}
      {role === "Accountant" && (
        <div className='card p-24 radius-12'>
          <h5>Financial & Shipment Overview</h5>
          <p>You have <strong>{stats.accountant.shipmentsPending}</strong> shipments ready for final invoice generation.</p>
          <button className='btn btn-primary'>Process Shipments</button>
        </div>
      )}
    </div>
  );
};

export default WMSDashboardLayer;
