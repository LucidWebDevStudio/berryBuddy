interface Props {
  content: string;
}
export const UserMessage = ({ content }: Props) => {
  return (
    <section className="flex justify-end mb-2">
      <div className="inline-block w-fit max-w-[80%] rounded-xl p-1 py-3 bg-primary text-primary-foreground">
        <p className="whitespace-pre-wrap px-3">{content}</p>
      </div>
    </section>
  );
};
