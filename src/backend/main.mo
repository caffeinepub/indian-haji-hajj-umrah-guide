import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  // Types
  type StepType = {
    #hajj;
    #umrah;
  };

  type Dua = {
    id : Nat;
    name : Text;
    arabic : Text;
    hindiTransliteration : Text;
    hindiMeaning : Text;
    category : StepType;
  };

  module Dua {
    public func compare(dua1 : Dua, dua2 : Dua) : Order.Order {
      if (dua1.id < dua2.id) {
        #less;
      } else if (dua1.id > dua2.id) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  type RitualStep = {
    stepNumber : Nat;
    title : Text;
    description : Text;
    duaId : ?Nat;
    icon : Text;
    day : ?Nat;
    stepType : StepType;
  };

  module RitualStep {
    public func compare(step1 : RitualStep, step2 : RitualStep) : Order.Order {
      if (step1.stepNumber < step2.stepNumber) {
        #less;
      } else if (step1.stepNumber > step2.stepNumber) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  type UserProgress = {
    completedHajjSteps : [Nat];
    completedUmrahSteps : [Nat];
  };

  type PdfFlipbook = {
    name : Text;
    url : Storage.ExternalBlob;
    pageCount : Nat;
  };

  // Persistent Data
  var nextDuaId = 1;
  let duaLibrary = Map.empty<Nat, Dua>();
  let ritualSteps = Map.empty<Nat, RitualStep>();
  let userProgress = Map.empty<Principal, UserProgress>();
  let pdfFlipbooks = Map.empty<Text, PdfFlipbook>();

  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Dua Library Functions
  public query ({ caller }) func getDua(id : Nat) : async ?Dua {
    duaLibrary.get(id);
  };

  public query ({ caller }) func getAllDuas() : async [Dua] {
    duaLibrary.values().toArray().sort();
  };

  public shared ({ caller }) func addDua(name : Text, arabic : Text, hindiTransliteration : Text, hindiMeaning : Text, category : StepType) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    let id = nextDuaId;
    nextDuaId += 1;
    let dua : Dua = {
      id;
      name;
      arabic;
      hindiTransliteration;
      hindiMeaning;
      category;
    };
    duaLibrary.add(id, dua);
    id;
  };

  // Ritual Step Functions
  public query ({ caller }) func getRitualStep(stepNumber : Nat) : async ?RitualStep {
    ritualSteps.get(stepNumber);
  };

  public query ({ caller }) func getAllRitualSteps() : async [RitualStep] {
    ritualSteps.values().toArray().sort();
  };

  public shared ({ caller }) func addRitualStep(step : RitualStep) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    ritualSteps.add(step.stepNumber, step);
  };

  // User Progress Functions
  public query ({ caller }) func getUserProgress(user : Principal) : async ?UserProgress {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own progress");
    };
    userProgress.get(user);
  };

  public shared ({ caller }) func updateUserProgress(progress : UserProgress) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update progress");
    };
    userProgress.add(caller, progress);
  };

  // PDF Flipbook Functions
  public query ({ caller }) func getFlipbook(name : Text) : async ?PdfFlipbook {
    pdfFlipbooks.get(name);
  };

  public query ({ caller }) func getAllFlipbooks() : async [PdfFlipbook] {
    pdfFlipbooks.values().toArray();
  };

  public shared ({ caller }) func addFlipbook(name : Text, url : Storage.ExternalBlob, pageCount : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Admin access required");
    };
    let flipbook : PdfFlipbook = {
      name;
      url;
      pageCount;
    };
    pdfFlipbooks.add(name, flipbook);
  };

  // Utility Functions
  public query ({ caller }) func searchDuasByCategory(category : StepType) : async [Dua] {
    duaLibrary.values().toArray().filter(
      func(dua) { dua.category == category }
    );
  };

  public query ({ caller }) func searchRitualStepsByType(stepType : StepType) : async [RitualStep] {
    ritualSteps.values().toArray().filter(
      func(step) { step.stepType == stepType }
    );
  };
};
