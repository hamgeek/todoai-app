import { FeaturesCard } from '@/shared/ui';

export function FeaturesSection() {
  const featureLists = [
    {
      title: 'Simple and Intuitive',
      description:
        'Our app is designed to be incredibly user-friendly. Its intuitive interface allows you to effortlessly manage your tasks and stay organized, even if you’re new to task management.',
      imagePath: '/dashboard-preview.png',
    },
    {
      title: 'Effortless Navigation',
      description:
        'With a clean, streamlined design, navigating our app is a breeze. Quickly add, organize, and complete tasks with minimal effort, thanks to its easy-to-use features.',
      imagePath: '/feature-2.png',
    },
    {
      title: 'Smart Task Planning with AI',
      description:
        'Boost your productivity with our integrated generative AI. Our app helps you create and plan tasks more efficiently, offering intelligent suggestions and automating routine tasks to save you time.',
      imagePath: '/feature-3.png',
    },
  ];

  return (
    <section className="w-full">
      <div className="flex w-full flex-col items-center pb-8 pt-16 md:pb-16 md:pt-24">
        <h1 className="text-3xl font-bold text-gray-700">Features</h1>
      </div>
      <div className="flex w-full flex-col items-center gap-14 overflow-hidden py-14">
        {Object.keys(featureLists).length > 0 &&
          featureLists.map((feature) => (
            <FeaturesCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              imagePath={feature.imagePath}
            />
          ))}
      </div>
    </section>
  );
}
