// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobPayment {
    struct Job {
        uint256 amount;
        uint256 unlockTime;
        uint256 startTime;
        uint256 workDuration;
        address employee;
        bool claimed;
    }

    struct SalaryPool {
        uint256 amount;
        uint256 lockedAmount;
    }

    mapping(address => Job[]) public jobs;
    mapping(address => SalaryPool) public salaryPool;

    event JobCreated(address indexed employer, address indexed employee, uint256 amount, uint256 unlockTime, uint256 jobId);
    event JobStarted(address indexed employer, address indexed employee, uint256 jobId);
    event PaymentClaimed(address indexed employee, uint256 amount);
    event SalaryPoolFundsAdded(address indexed employer, uint256 amount);
    event EmployeeJobCreated(address indexed employer, address indexed employee, uint256 jobId);

    // modifier onlyEmployer(address employer) {
    //     require(jobs[employer].employee != address(0), "No job for this employer");
    //     _;
    // }

    // modifier onlyEmployee(address employee) {
    //     require(jobs[msg.sender].employee == employee, "Not authorized");
    //     _;
    // }

    // Employer creates a salary pool
    function createSalaryPool(uint256 amount) external payable {
        require(msg.value == amount, "Funds deposited does not match amount");

        salaryPool[msg.sender].amount += msg.value;

        emit SalaryPoolFundsAdded(msg.sender, salaryPool[msg.sender].amount);
    }

    // Employee says they started the job
    function startJob(address employer, uint256 jobId) external {

        require(jobs[employer].length > jobId, "This job doesnt exist");

        Job storage job = jobs[employer][jobId];

        require(job.employee == msg.sender, "This job doesnt beling to you");

        require(jobs[employer][jobId].unlockTime == 0, "Job has already started");

        require(salaryPool[employer].lockedAmount >= job.amount, "Employer has insufficient funds");

        uint256 unlockTime = block.timestamp + jobs[employer][jobId].workDuration;
        job.unlockTime = unlockTime;
        // uint256 jobId = jobs[msg.sender].length - 1; // Job ID is the index of the job in the array

        
        emit JobStarted(employer, msg.sender, jobId);
    }

    // Employer authorizes an employee
    function createEmployeeJob(address employee, uint256 amount, uint256 startTime, uint256 workDuration) external {

        require(salaryPool[msg.sender].amount >= amount, "You dont have enough to cover the salary");

        jobs[msg.sender].push(Job({
                amount: amount,
                employee: employee,
                claimed: false,
                startTime: startTime,
                unlockTime: 0,
                workDuration: workDuration
            }));
        
        uint256 jobId = jobs[msg.sender].length - 1;

        salaryPool[msg.sender].amount -= jobs[msg.sender][jobId].amount;
        salaryPool[msg.sender].lockedAmount += jobs[msg.sender][jobId].amount;
        emit EmployeeJobCreated(msg.sender, employee, jobId);
    }

    function claimSalary(address employer, uint256 jobId) external {
        // Ensure the job exists for the employer and the jobId is valid
        require(jobId < jobs[employer].length, "Invalid job ID");

        Job storage job = jobs[employer][jobId];

        // Check that the caller is the assigned employee for the job
        require(msg.sender == job.employee, "Only the assigned employee can claim");

        // Ensure the job has not already been claimed
        require(!job.claimed, "Salary already claimed");

        require(job.unlockTime != 0, "Job was never began");
    
        // Ensure the job unlock time has passed
        require(block.timestamp >= job.unlockTime, "Job unlock time not reached");

        // Ensure there are sufficient locked funds in the salary pool
        require(salaryPool[employer].lockedAmount >= job.amount, "Employer has insufficient locked funds");

        // Mark the job as claimed
        job.claimed = true;

        // Deduct the claimed amount from the employer's locked funds
        salaryPool[employer].lockedAmount -= job.amount;

        // Transfer the salary amount to the employee
        payable(msg.sender).transfer(job.amount);

        // Emit an event for the claim
        emit PaymentClaimed(msg.sender, job.amount);
    }

    // Fallback function to receive funds
    receive() external payable {}
}