import { PackageDetailsCard } from "../../components/cards/PackageDetailsCard";

export const PackageDetailsView = () => {
  return (
    <div data-testid="package-details-container" className="sm:flex sm:flex-col sm:items-center sm:p-6 flex-1 justify-center">
        <PackageDetailsCard />
    </div>
  );
};
