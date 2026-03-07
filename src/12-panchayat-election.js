/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Private state (CLOSURE)
  const votes = {}; // { candidateId: voteCount }
  const registeredVoters = new Set();
  const votedVoters = new Set();

  // Initialize vote count for all candidates
  const candidateMap = new Map();
  if (Array.isArray(candidates)) {
    candidates.forEach((c) => {
      if (c && c.id) {
        votes[c.id] = 0;
        candidateMap.set(c.id, c);
      }
    });
  }

  function registerVoter(voter) {
    // validation
    if (
      !voter ||
      typeof voter !== "object" ||
      !voter.id ||
      !voter.name ||
      typeof voter.age !== "number"
    ) {
      return false;
    }

    if (voter.age < 18) return false;
    if (registeredVoters.has(voter.id)) return false;

    registeredVoters.add(voter.id);
    return true;
  }

  function castVote(voterId, candidateId, onSuccess, onError) {
    // Validate voter registered
    if (!registeredVoters.has(voterId)) {
      return onError?.("Voter not registered");
    }

    // Validate candidate exists
    if (!candidateMap.has(candidateId)) {
      return onError?.("Candidate does not exist");
    }

    // Check already voted
    if (votedVoters.has(voterId)) {
      return onError?.("Voter has already voted");
    }

    // Record vote
    votes[candidateId] = (votes[candidateId] || 0) + 1;
    votedVoters.add(voterId);

    return onSuccess?.({ voterId, candidateId });
  }

  function getResults(sortFn) {
    const results = Array.from(candidateMap.values()).map((c) => ({
      id: c.id,
      name: c.name,
      party: c.party,
      votes: votes[c.id] || 0,
    }));

    if (typeof sortFn === "function") {
      return results.sort(sortFn); // HOF usage
    }

    // Default: sort by votes descending
    return results.sort((a, b) => b.votes - a.votes);
  }

  function getWinner() {
    const results = getResults();

    if (results.length === 0) return null;
    if (results.every((r) => r.votes === 0)) return null;

    // Already sorted descending, first is winner
    return results[0];
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}

// FACTORY FUNCTION
export function createVoteValidator(rules = {}) {
  const { minAge = 18, requiredFields = ["id", "name", "age"] } = rules;

  return function validate(voter) {
    if (!voter || typeof voter !== "object") {
      return { valid: false, reason: "Invalid voter object" };
    }

    // Check required fields
    for (let field of requiredFields) {
      if (voter[field] === undefined || voter[field] === null) {
        return { valid: false, reason: `Missing field: ${field}` };
      }
    }

    // Age validation
    if (typeof voter.age !== "number" || voter.age < minAge) {
      return { valid: false, reason: `Age must be at least ${minAge}` };
    }

    return { valid: true, reason: "Valid voter" };
  };
}

// RECURSION
export function countVotesInRegions(regionTree) {
  if (
    !regionTree ||
    typeof regionTree !== "object" ||
    typeof regionTree.votes !== "number"
  ) {
    return 0;
  }

  let total = regionTree.votes;

  if (Array.isArray(regionTree.subRegions)) {
    for (let sub of regionTree.subRegions) {
      total += countVotesInRegions(sub); // recursive call
    }
  }

  return total;
}

// PURE FUNCTION (no mutation)
export function tallyPure(currentTally, candidateId) {
  const newTally = { ...(currentTally || {}) };

  if (!candidateId) return newTally;

  newTally[candidateId] = (newTally[candidateId] || 0) + 1;

  return newTally;
}